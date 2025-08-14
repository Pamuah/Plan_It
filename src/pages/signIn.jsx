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
    <div className="flex flex-col w-screen min-h-screen bg-background">
      {/* Nav Bar */}
      <div className="flex flex-row items-center justify-between w-full h-16 px-6 py-2 bg-white shadow-lg">
        {/* Logo */}
        <div>
          <h6>**Logo**</h6>
        </div>
        {/* Routes */}
        <div className="flex flex-row items-center gap-4">
          <a
            href="/signUp"
            className="px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            Home
          </a>
          <a
            href="/signUp"
            className="px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            About us
          </a>
          <a
            href="/signUp"
            className="px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            Contact us
          </a>
          <a
            href="/signUp"
            className="px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            Payment
          </a>
          <CustomButton
            title="Register"
            onPress={() => {
              navigate("/signUp");
            }}
            className="w-auto h-8 text-sm"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row items-center justify-center flex-1 w-full pt-2 pb-2 h-128 px-36 ">
        {/* Image with dark overlay */}
        <div className="relative flex flex-col items-center justify-center w-3/5 h-128">
          <img
            src="../assets/party.jpg"
            className="object-cover w-full h-full rounded-md"
          />
        </div>

        {/* Form */}
        <div className="flex flex-col items-start justify-start w-2/5 px-4 py-6 bg-white rounded-sm shadow-lg h-128">
          <h6 className="mb-4 text-2xl font-bold font-inter text-slate-700">
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
              // handle_Submit();
              navigate("/home");
            }}
            className="h-8 py-1 my-4 text-sm rounded-sm w-9/10 text-semibold"
          />

          <p className="text-xs font-normal text-slate-500">
            forgot Password?{" "}
            <a
              href="/reset"
              className="font-semibold text-amber-400 hover:underline"
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
