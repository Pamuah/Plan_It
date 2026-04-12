import React, { useState, useEffect } from "react";
import CustomInput from "../components/custom_input";
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

const Register = () => {
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

  const checkUser = async () => {
    setCheckingUser(true);
    try {
      const response = await axios.get(
        `https://plan-it-rzv3.onrender.com/users/check-username/?username=${username}`,
      );
      setUserExists(response.data.available);
    } catch (error) {
      console.error("An error occurred", error);
      setUserExists(null);
    } finally {
      setCheckingUser(false);
    }
  };

  useEffect(() => {
    if (debounceUsername.length >= 3) {
      checkUser();
    } else {
      setUserExists(null);
    }
  }, [debounceUsername]);

  const handleSubmit = async () => {
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !confirm_password ||
      !phone_number ||
      !username
    ) {
      alert("All fields are required");
      return;
    }
    if (password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }
    if (!user_exists) {
      alert("Username is already taken. Please choose another.");
      return;
    }

    const data = {
      first_name,
      last_name,
      username,
      email,
      phone_number,
      password,
      confirm_password,
    };

    try {
      const response = await sendControlData(data, "/users/register/");
      console.log("Server Response:", response);
      alert("Registered successfully!");
      navigate("/signIn");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-screen min-h-screen bg-slate-50">
      {/* Nav Bar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-8 bg-white border-b shadow-sm border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <span className="text-xs font-bold text-white">PI</span>
          </div>
          <span className="text-sm font-semibold text-slate-800">Plan-It</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            className="px-3 py-2 text-xs font-medium transition-all duration-150 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          >
            Home
          </a>
          <a
            href="/about"
            className="px-3 py-2 text-xs font-medium transition-all duration-150 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="px-3 py-2 text-xs font-medium transition-all duration-150 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          >
            Contact Us
          </a>
          <a
            href="/payment"
            className="px-3 py-2 text-xs font-medium transition-all duration-150 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          >
            Payment
          </a>
          <CustomButton
            title="Login"
            onPress={() => navigate("/signIn")}
            className="h-8 px-4 text-xs"
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex items-center justify-center flex-1 px-8 py-16">
        <div className="flex w-full max-w-4xl overflow-hidden shadow-xl rounded-2xl">
          {/* Left — Image with dark overlay */}
          <div className="relative hidden w-2/5 md:block">
            <img
              src="../assets/event1.jpg"
              alt="Event"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8 text-white">
              <h2 className="text-2xl font-bold leading-snug">
                Create your
                <br />
                Plan-It account.
              </h2>
              <p className="mt-2 text-xs text-white/70">
                Join thousands of event planners today.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="flex flex-col justify-center w-full px-10 py-12 bg-white md:w-3/5">
            <h1 className="mb-1 text-2xl font-bold text-slate-800">
              Create an account
            </h1>
            <p className="mb-8 text-xs text-slate-400">
              Fill in the details below to get started
            </p>

            {/* First Name & Last Name */}
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <CustomInput
                  width="w-full"
                  placeholder="John"
                  label="First Name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <CustomInput
                  width="w-full"
                  placeholder="Doe"
                  label="Surname"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Username with availability check */}
            <div className="relative mb-4">
              <CustomInput
                width="w-full"
                placeholder="Daddy Joe"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={faUser}
              />
              <span className="absolute right-3 top-9">
                {checkingUser ? (
                  <span className="inline-block text-gray-400 animate-spin">
                    ⏳
                  </span>
                ) : user_exists === false ? (
                  <span className="text-sm text-red-500">❌ Taken</span>
                ) : user_exists === true ? (
                  <span className="text-sm text-green-500">✅ Available</span>
                ) : null}
              </span>
            </div>

            {/* Email & Phone */}
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <CustomInput
                  width="w-full"
                  type="email"
                  placeholder="doe@gmail.com"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={faEnvelope}
                />
              </div>
              <div className="w-1/2">
                <CustomInput
                  width="w-full"
                  placeholder="0555555599"
                  label="Phone"
                  value={phone_number}
                  onChange={(e) => setPhone(e.target.value)}
                  icon={faPhone}
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                <CustomInput
                  width="w-full"
                  type="password"
                  placeholder="••••••••••"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={faLock}
                />
              </div>
              <div className="w-1/2">
                <CustomInput
                  width="w-full"
                  type="password"
                  placeholder="••••••••••"
                  label="Confirm Password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={faLock}
                />
              </div>
            </div>

            <CustomButton
              title="Create Account"
              onPress={handleSubmit}
              className="w-full h-10 text-sm font-semibold rounded-lg"
            />

            <p className="mt-6 text-xs text-center text-slate-400">
              Already have an account?{" "}
              <a
                href="/signIn"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
