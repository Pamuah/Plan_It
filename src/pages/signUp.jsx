import React from "react";
import CustomInput from "../components/custom_input";
import { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { sendControlData } from "../Api_Services/services";
import Footer from "../components/footer";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [phone_number, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [user_exists, setUserExists] = useState(null);
  const [checkingUser, setCheckingUser] = useState(false);

  const navigate = useNavigate();

  const debounceUsername = useDebounce(username, 1000);
  //checking if username  exists
  const Check_User = async () => {
    setCheckingUser(true);

    try {
      const response = await axios.get(
        `https://plan-it-rzv3.onrender.com/users/check-username/?username=${username}`
      );
      setUserExists(response.data.available);
      console.log(response.data.available);
    } catch (error) {
      console.error("An Error occured", error);
      setUserExists(null);
    } finally {
      setCheckingUser(false);
    }
  };

  useEffect(() => {
    if (debounceUsername.length >= 3) {
      Check_User(debounceUsername);
    } else {
      setUserExists(null);
    }
  }, [debounceUsername]);

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
      first_name,
      last_name,
      username,
      email,
      phone_number,
      password,
      confirm_password,
    };
    console.log("payload being sent", JSON.stringify(data));
    try {
      const response = await sendControlData(data, "/users/register/");

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
        <div className="gap-5 flex flex-row items-center">
          <a
            href="/signUp"
            className="text-black text-sm px-3 py-1 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            Home
          </a>
          <a
            href="/signUp"
            className="text-black text-sm px-3 py-1 rounded-lg hover:bg-blue-500  transition-all duration-200"
          >
            About us
          </a>
          <a
            href="/signUp"
            className="text-black text-sm px-3 py-1 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            Contact us
          </a>
          <a
            href="/signUp"
            className="text-black text-sm px-3 py-1 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            Payment
          </a>
          <CustomButton
            title="Login"
            onPress={() => {
              navigate("/signIn");
            }}
            className="h-8 w-auto text-sm"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 w-full h-128 flex-row justify-center items-center px-36 pt-2 pb-2 ">
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
                width={"w-full"}
                placeholder={"John"}
                label={"First Name"}
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <CustomInput
                width={"w-full"}
                placeholder={"Doe"}
                label={"Surname"}
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Username */}
          <div className="relative w-full">
            <CustomInput
              width={"w-full"}
              placeholder={"Daddy joe"}
              label={"Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={faUser}
            />

            {/* Status Icon */}
            {checkingUser ? (
              <span className="absolute right-3 top-10 text-gray-400 animate-spin">
                ⏳
              </span>
            ) : user_exists === false ? (
              <span className="absolute right-3 top-10 text-red-500">❌</span>
            ) : user_exists === true ? (
              <span className="absolute right-3 top-10 text-green-500">✅</span>
            ) : null}
          </div>

          {/* Email & Phone */}
          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <CustomInput
                width={"w-full"}
                type={"email"}
                placeholder={"doe@gmail.com"}
                label={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={faEnvelope}
              />
            </div>
            <div className="w-1/2 pr-4">
              <CustomInput
                width={"w-full"}
                placeholder={"0555555599"}
                label={"Phone"}
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
                icon={faPhone}
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="flex w-full gap-4">
            <div className="w-1/2">
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
            <div className="w-1/2 pr-4">
              <CustomInput
                width={"w-full"}
                type={"password"}
                placeholder={"**********"}
                label={"Confirm Password"}
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={faLock}
              />
            </div>
          </div>

          <CustomButton
            title="Register"
            onPress={() => {
              handle_Submit();
            }}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignUp;
