import React from "react";
import CustomInput from "../components/custom_input";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="flex flex-col min-h-screen w-screen bg-background">
      {/* Nav Bar */}
      <div className="h-16 w-full items-center justify-between bg-white shadow-lg px-6 py-2 flex flex-row">
        {/* Logo */}
        <div>
          <h6>**Logo**</h6>
        </div>
        {/* Routes */}
        <div className="gap-8 flex flex-row items-center">
          <a href="/signUp" className="text-black text-sm">
            Home
          </a>
          <a href="/signUp" className="text-black text-sm">
            About us
          </a>
          <a href="/signUp" className="text-black text-sm">
            Contact us
          </a>
          <a href="/signUp" className="text-black text-sm">
            Payment
          </a>
          <CustomButton
            title="Login"
            onPress={() => {}}
            className="h-8 w-auto text-sm "
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 w-full h-128 flex-row justify-center items-center px-36 pt-2">
        {/* Image with dark overlay */}
        <div className="relative flex flex-col items-center justify-center w-1/2 h-128">
          <img
            src="../assets/event1.jpg"
            className="h-full w-full object-cover rounded-md"
          />
        </div>

        {/* Form */}
        <div className="flex flex-col items-start justify-start w-1/2 h-128 bg-white shadow-lg px-4 py-6 rounded-sm">
          <h6 className="text-2xl font-bold font-inter text-slate-700 mb-4">
            CUSTOMER REGISTRATION
          </h6>

          {/* First Name & Surname */}
          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <CustomInput
                placeholder={"John"}
                label={"First Name"}
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <CustomInput
                placeholder={"Doe"}
                label={"Surname"}
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Username */}
          <div className="w-full">
            <CustomInput
              width={"w-full"}
              placeholder={"Daddy joe"}
              label={"Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={faUser}
            />
          </div>

          {/* Email & Phone */}
          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <CustomInput
                placeholder={"doe@gmail.com"}
                label={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={faEnvelope}
              />
            </div>
            <div className="w-1/2">
              <CustomInput
                placeholder={"0555555599"}
                label={"Phone"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={faPhone}
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <CustomInput
                placeholder={"**********"}
                label={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={faLock}
              />
            </div>
            <div className="w-1/2">
              <CustomInput
                placeholder={"**********"}
                label={"Confirm Password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={faLock}
              />
            </div>
          </div>

          <CustomButton
            title="Register"
            onPress={() => {}}
            className="h-8 w-full text-sm my-4 text-semibold rounded-sm py-1"
          />

          <p className="text-xs font-normal text-slate-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-amber-400 hover:underline font-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
