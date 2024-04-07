"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchData = async (address: string) => {
  const response = await fetch("https://httpbin.org/get");
  if (!response.ok) {
    throw new Error("Error making API call");
  }
  return response.json();
};

export default function SearchAddress() {
  const [inputValue, setInputValue] = useState("");

  const { data, isLoading, error, refetch } = useQuery("address", () => fetchData(inputValue), {
    enabled: false, // Disabled by default, will be enabled on form submission
  });

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    refetch(); // Trigger the API call
  };

  const renderResponse = (data: any) => {
    return data;
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
            <div className="flex items-center border rounded-lg">
              <input
                placeholder="0xNeverBeenRekt"
                className="py-2 px-4 w-full outline-none, text-black"
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
      <div className="mt-5">
        {isLoading && <p>Loading...</p>}
        {/* {error && <p>Error: {error.message}</p>} */}
        {data && (
          <div>
            {/* Add response data here */}
            <p>API response: {renderResponse(JSON.stringify(data))}</p>
          </div>
        )}
      </div>
    </>
  );
}
