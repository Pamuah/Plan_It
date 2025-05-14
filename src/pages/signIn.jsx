import React from "react";
import CustomInput from "../components/custom_input";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { sendControlData } from "../Api_Services/services";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handle_Submit = async () => {
    console.log("clicked");
    // if (password !== confirmPassword) {
    //   alert("Passwords do not match");
    //   return false;
    // } else if (
    //   firstname === "" ||
    //   lastname === "" ||
    //   email === "" ||
    //   password === "" ||
    //   confirmPassword === "" ||
    //   phone === "" ||
    //   username === ""
    // ) {
    //   alert("All fields are required");
    //   return false;
    // }

    const data = {
      username,
      password,
    };
    console.log("payload being sent", JSON.stringify(data));
    try {
      const response = await sendControlData(data, "/users/login/");
      console.log("Server Response:", response);

      alert("registered successfully");
    } catch (error) {
      console.error("Registreation failed!!", error);
      alert("Registreation failed!!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-background">
      {/* Nav Bar */}
      <div className="h-16 w-full items-center justify-between bg-white shadow-lg px-6 py-2 flex flex-row">
        {/* Logo */}
        <div>
          <h6>**Logo**</h6>
        </div>
        {/* Routes */}
        <div className="gap-4 flex flex-row items-center">
          <a
            href="/signUp"
            className="text-black text-xs px-3 py-1 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            Home
          </a>
          <a
            href="/signUp"
            className="text-black text-xs px-3 py-1 rounded-lg hover:bg-blue-500  transition-all duration-200"
          >
            About us
          </a>
          <a
            href="/signUp"
            className="text-black text-xs px-3 py-1 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            Contact us
          </a>
          <a
            href="/signUp"
            className="text-black text-xs px-3 py-1 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            Payment
          </a>
          <CustomButton
            title="Register"
            onPress={() => {
              navigate("/signUp");
            }}
            className="h-8 w-auto text-sm"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 w-full h-128 flex-row justify-center items-center px-36 pt-2 pb-2 ">
        {/* Image with dark overlay */}
        <div className="relative flex flex-col items-center justify-center w-3/5 h-128">
          <img
            src="../assets/party.jpg"
            className="h-full w-full object-cover rounded-md"
          />
        </div>

        {/* Form */}
        <div className="flex flex-col items-start justify-start w-2/5 h-128 bg-white shadow-lg px-4 py-6 rounded-sm">
          <h6 className="text-2xl font-bold font-inter text-slate-700 mb-4">
            CUSTOMER SIGN-IN
          </h6>

          {/* Username */}
          <div className="w-9/10">
            <CustomInput
              width={"w-full"}
              type={"email"}
              placeholder={"doe@gmail.com"}
              label={"Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={faEnvelope}
            />
          </div>

          {/* Password */}
          <div className="flex w-full gap-4">
            <div className="w-9/10">
              <CustomInput
                width={"w-full"}
                type={"password"}
                placeholder={"**********"}
                label={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={faLock}
              />
            </div>
          </div>

          <CustomButton
            title="Login"
            onPress={() => {
              handle_Submit();
            }}
            className="h-8 w-9/10 text-sm my-4 text-semibold rounded-sm py-1"
          />

          <p className="text-xs font-normal text-slate-500">
            forgot Password?{" "}
            <a
              href="/reset"
              className="text-amber-400 hover:underline font-semibold"
            >
              Reset
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignUp;
