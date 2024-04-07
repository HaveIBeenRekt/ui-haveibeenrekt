"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchData = async ({ address, name }: { address: string; name: string }) => {
  console.log(address, name);
  const response = await fetch(`https://httpbin.org/get?address=${address}&name=${name}`);
  if (!response.ok) {
    throw new Error("Error making API call");
  }
  return response.json();
};

export default function SubmitNewContractForm() {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const { data, isLoading, error, refetch } = useQuery(
    ["contractData", address, name],
    () => fetchData({ address, name }),
    {
      enabled: false, // Disabled by default, will be enabled on form submission
    }
  );

  const handleAddressChange = (event: any) => {
    setAddress(event.target.value);
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: any) => {
    // console.log(address, name);
    event.preventDefault();
    refetch(); // Trigger the API call
  };

  const renderResponse = (data: any) => {
    return JSON.stringify(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-4 pt-5em max-w-md w-full p-8 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl text-black font-semibold mb-4">
            Want to submit a contract to our database?
          </h2>
          <p className="text-black pb-6">
            If there's a malicious contract you think we're missing, add it to our database to
            increase our data coverage.
          </p>
          <div className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center border rounded-lg">
                <input
                  placeholder="0xdac17f958d2ee523a2206206994597c13d831ec7"
                  className="py-2 px-4 w-full outline-none, text-black"
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="flex items-center border rounded-lg mt-4">
                <input
                  placeholder="Tether is malicious."
                  className="py-2 px-4 w-full outline-none, text-black"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="mt-5" style={{ textAlign: "center" }}>
          {isLoading && <p>Loading...</p>}
          {/* {error && <p>Error: {error.message}</p>} */}
          {data && (
            <div>
              <h2 className="text-4xl">API Response:</h2>
              <p>{renderResponse(data)}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
