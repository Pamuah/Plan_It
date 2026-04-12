import React, { useState } from "react";
import CustomInput from "../components/custom_input";
import CustomButton from "../components/CustomButton";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { sendControlData } from "../Api_Services/services";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    const data = { username, password };

    try {
      const response = await sendControlData(data, "/users/login/");
      console.log("Server Response:", response);
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col w-screen min-h-screen bg-slate-50">
      {/* Nav Bar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-8 bg-white border-b shadow-sm border-slate-100">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <span className="text-xs font-bold text-white">PI</span>
          </div>
          <span className="text-sm font-semibold text-slate-800">Plan-It</span>
        </div>

        {/* Nav Links */}
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
            title="Register"
            onPress={() => navigate("/register")}
            className="h-8 px-4 text-xs"
          />
        </div>
      </nav>

      {/* Main Content — scrollable, vertically centered */}
      <main className="flex items-center justify-center flex-1 px-8 py-16">
        <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl min-h-[520px]">
          {/* Left — Image with dark overlay */}
          <div className="relative hidden w-1/2 md:block">
            <img
              src="../assets/party.jpg"
              alt="Event"
              className="object-cover w-full h-full"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
            {/* Optional text on image */}
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8 text-white">
              <h2 className="text-2xl font-bold leading-snug">
                Plan your next
                <br />
                perfect event.
              </h2>
              <p className="mt-2 text-xs text-white/70">
                Thousands of vendors, one platform.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="flex flex-col justify-center w-full px-10 py-12 bg-white md:w-1/2">
            <h1 className="mb-1 text-2xl font-bold text-slate-800">
              Welcome back
            </h1>
            <p className="mb-8 text-xs text-slate-400">
              Sign in to your Plan It account
            </p>

            {/* Username */}
            <div className="mb-4">
              <CustomInput
                width="w-full"
                type="email"
                placeholder="doe@gmail.com"
                label="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={faEnvelope}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
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

            {/* Forgot password */}
            <div className="flex justify-end mb-6">
              <a
                href="/reset"
                className="text-xs font-medium text-amber-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <CustomButton
              title="Sign In"
              onPress={handleSubmit}
              className="w-full h-10 text-sm font-semibold rounded-lg"
            />

            <p className="mt-6 text-xs text-center text-slate-400">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
