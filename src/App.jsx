import React from "react";
import CustomInput from "./components/custom_input";
import { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [username, setUsername] = useState("");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl text-primary">Plan It and execute</h1>
      <CustomInput
        placeholder="Enter username"
        Value={username}
        onChange={(e) => setUsername(e.target.value)}
        icon={faUser}
      />
    </div>
  );
};

export default App;
