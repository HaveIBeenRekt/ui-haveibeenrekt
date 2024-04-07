import React, { useState } from "react";

interface State {
  inputValue: string;
}

export default function About() {
  // const [state, setState] = useState<State>({
  //   inputValue: "",
  // });

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-center text-2xl text-black font-semibold mb-4">About</h2>
      <div className="mb-4">
        <h2 className="text-5xl">have you been rekt?</h2>
      </div>
      <div className="mb-4">
        <p>Users can search if their address has approved any malicious contracts</p>
      </div>
      <div>
        <p>Users can also submit malicious addresses to our database</p>
      </div>
    </div>
  );
}
