import React from "react";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/homePage";
import Vendor from "./pages/Vendor";
import MyCartPage from "./pages/MyCartPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Vendor />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendors" element={<Vendor />} />
        <Route path="/myCart" element={<MyCartPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/homePage" element={<HomePage />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
