import React, { useState } from "react";
import SubmitNewContractForm from "./components/SubmitNewContractForm";

const handleSubmit = (event: any) => {
  event.preventDefault();

  console.log("Making API call");
};

interface State {
  inputValue: string;
}

export default function SubmitContract() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SubmitNewContractForm></SubmitNewContractForm>
    </div>
  );
}
