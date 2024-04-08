"use client";
import React, { useState, useEffect } from "react";
import { readContract } from "@wagmi/core";
import abi from "../abi";
import { config } from "../config";

const result = await readContract(config, {
  abi,
  address: "0xF7B8fBe3DFAc23CA12e7ac28df1ac5b5F407dA35",
  functionName: "readEntries",
  args: [0, 500],
});

export default function SearchAddress() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("submitted");
    console.log(result());
  };

  return (
    <>
      <div className="mt-4 pt-5em max-w-md w-full p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl text-black font-semibold mb-4">Have you been rekt?</h2>
        <p className="text-black pb-6">
          Enter your address to see if you've approved any malicious contracts we're tracking in our
          database.
        </p>
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center border rounded-lg" style={{ color: "black" }}>
              <input
                placeholder="0xNeverBeenRekt"
                className="py-2 px-4 w-full outline-none text-black"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ml-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
