import React, { useState } from "react";
import CustomInput from "../components/custom_input";
import CustomButton from "../components/CustomButton";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { sendControlData } from "../Api_Services/services";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      alert("Email is required");
      return;
    }

    const data = { email };
    console.log("Payload being sent:", JSON.stringify(data));
    try {
      const response = await sendControlData(data, "/users/reset-password/");
      console.log("Server Response:", response);
      alert("Password reset link sent successfully. Check your email.");
      navigate("/signIn");
    } catch (error) {
      console.error("Password reset failed:", error);
      alert("Password reset failed. Please try again.");
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
            href="/"
            className="px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            Home
          </a>
          <a
            href="/about"
            className="px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            About us
          </a>
          <a
            href="/contact"
            className="px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            Contact us
          </a>
          <a
            href="/payment"
            className="px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            Payment
          </a>
          <CustomButton
            title="Sign In"
            onPress={() => navigate("/signIn")}
            className="w-auto h-8 text-sm"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center flex-1 w-full pt-2 pb-2 h-128 px-36">
        {/* Form */}
        <div className="flex flex-col items-start justify-start w-2/5 px-4 py-6 bg-white rounded-sm shadow-lg h-128">
          <h6 className="mb-4 text-2xl font-bold font-inter text-slate-700">
            FORGOT PASSWORD
          </h6>

          {/* Email */}
          <div className="w-9/10">
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

          <CustomButton
            title="Send Reset Link"
            onPress={
              //handleSubmit
              navigate("/reset-password/:token")
            }
            className="h-8 py-1 my-4 text-sm rounded-sm w-9/10 text-semibold"
          />

          <p className="text-xs font-normal text-slate-500">
            Back to{" "}
            <a
              href="/signIn"
              className="font-semibold text-amber-400 hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ForgotPassword;
