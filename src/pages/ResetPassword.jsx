import React, { useState } from "react";
import CustomInput from "../components/custom_input";
import CustomButton from "../components/CustomButton";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { sendControlData } from "../Api_Services/services";
import Footer from "../components/footer";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      alert("Both password fields are required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = { password, token };
    console.log("Payload being sent:", JSON.stringify(data));
    try {
      const response = await sendControlData(
        data,
        "/users/reset-password/confirm/"
      );
      console.log("Server Response:", response);
      alert("Password reset successfully. Please sign in.");
      navigate("/signIn");
    } catch (error) {
      console.error("Password reset failed:", error);
      alert("Password reset failed. Please try again.");
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
            href="/"
            className="text-black text-xs px-3 py-1 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-black text-xs px-3 py-1 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            About us
          </a>
          <a
            href="/contact"
            className="text-black text-xs px-3 py-1 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            Contact us
          </a>
          <a
            href="/payment"
            className="text-black text-xs px-3 py-1 rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            Payment
          </a>
          <CustomButton
            title="Sign In"
            onPress={() => navigate("/signIn")}
            className="h-8 w-auto text-sm"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 w-full h-128 justify-center items-center px-36 pt-2 pb-2">
        {/* Form */}
        <div className="flex flex-col items-start justify-start w-2/5 h-128 bg-white shadow-lg px-4 py-6 rounded-sm">
          <h6 className="text-2xl font-bold font-inter text-slate-700 mb-4">
            RESET PASSWORD
          </h6>

          {/* Password */}
          <div className="w-9/10">
            <CustomInput
              width={"w-full"}
              type={"password"}
              placeholder={"**********"}
              label={"New Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={faLock}
            />
          </div>

          {/* Confirm Password */}
          <div className="w-9/10">
            <CustomInput
              width={"w-full"}
              type={"password"}
              placeholder={"**********"}
              label={"Confirm Password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={faLock}
            />
          </div>

          <CustomButton
            title="Reset Password"
            onPress={handleSubmit}
            className="h-8 w-9/10 text-sm my-4 text-semibold rounded-sm py-1"
          />

          <p className="text-xs font-normal text-slate-500">
            Back to{" "}
            <a
              href="/signIn"
              className="text-amber-400 hover:underline font-semibold"
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

export default ResetPassword;
