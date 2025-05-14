import React from "react";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>

        <Route index element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />

      </Routes>
    </Router>
  );
};

export default App;
