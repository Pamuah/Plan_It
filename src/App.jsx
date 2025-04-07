import React from "react";
import CustomButton from "./components/CustomButton";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl text-primary">Plan It and execute</h1>

      <CustomButton
        title="Login"
        backgroundColor="#007AFF"
        onPress={() => console.log("Login button clicked")}
        trailingIcon={faUser}
      />
    </div>
  );
};

export default App;
