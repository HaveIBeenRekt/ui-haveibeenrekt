"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import SearchAddress from "./components/SearchAddress";

import { readContract, writeContract } from "@wagmi/core";
import { abi } from "./abi";
import { config } from "./config";

const readResult = readContract(config, {
  abi,
  address: "0xF7B8fBe3DFAc23CA12e7ac28df1ac5b5F407dA35",
  functionName: "readEntries",
  args: [BigInt(0), BigInt(10)],
});

// const writeResult = writeContract(config, {
//   abi,
//   address: "0xF7B8fBe3DFAc23CA12e7ac28df1ac5b5F407dA35",
//   functionName: "proposeEntry",
//   args: ["", ""],
// });

const fetchApprovalOnChain = async (address: string, chainId: number) => {
  let headers = {
    accept: "application/json",
    Authorization: "Bearer ",
  };

  const res = await fetch(`https://api.covalenthq.com/v1/${chainId}/approvals/${address}/`, {
    headers,
  }).then((response) => response.json());
  return res;
};

const fetchAllApprovals = async (address: string) => {
  const chainIds = [1, 56, 137, 250, 43114, 42161, 10, 324, 8453, 81457];
  let allApprovals = [];

  // Get all contract approvals on all chains
  await Promise.all(
    chainIds.map(async (chainId) => {
      const res = await fetchApprovalOnChain(address, chainId);
      allApprovals.push(res);
    })
  );

  return allApprovals;
};

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  function processResults(fetchAllApprovalsResult, readResult) {
    return Promise.all([fetchAllApprovalsResult, readResult])
      .then(([fetchAllApprovalsRes, readResultRes]) => {
        console.log("Results from fetchAllApprovals:");
        fetchAllApprovalsRes.forEach((chain) => {
          console.log(chain);
        });

        console.log("Result from readResult:");
        console.table(readResultRes);

        return { fetchAllApprovalsRes, readResultRes };
      })
      .catch((error) => {
        console.error("Error processing results:", error);
      });
  }

  // Plug in a wallet here
  const fetchAllApprovalsPromise = fetchAllApprovals("");
  const readResultPromise = readResult;

  processResults(fetchAllApprovalsPromise, readResultPromise).then((results) => {
    const approvals = results.fetchAllApprovalsRes;
    const allMalContractsRes = results.readResultRes;
    let allMalContracts = [];
    let overlap = [];

    // Save data for contracts
    allMalContractsRes.map((adr) => {
      if (adr != "0x0000000000000000000000000000000000000000") {
        allMalContracts.push(adr._address.toLowerCase());
      }
    });

    // Save data that has spender_address in RPC data
    approvals.map((obj) => {
      const data = obj.data;
      const { chain_id, chain_name, items } = data;
      items.map((item) => {
        item.spenders.map((spender) => {
          if (allMalContracts.indexOf(spender.spender_address) !== -1) {
            overlap.push(spender);
          }
        });
      });
    });

    console.table(overlap);
  });

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button key={connector.uid} onClick={() => connect({ connector })} type="button">
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      <div></div>

      <div className="pt-5em text-black">{/* <SearchAddress></SearchAddress> */}</div>
    </>
  );
}

export default App;
