// import React, { useState } from "react";
// import "./App.css";
// import CustomInput from "./components/custom_input.jsx";
// import CustomButton from "./components/CustomButton.jsx";
// import { faUser, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError("Invalid email format");
//       return;
//     }
//     setError("");
//     console.log("Sign-in attempt:", { email, password });
//     alert("Sign-in successful!");
//   };

//   return (
//     <div className="signin-container">
//       <h2>Sign In</h2>
//       <form onSubmit={handleSubmit} className="signin-form">
//         {error && <p className="error">{error}</p>}
//         <CustomInput
//           label="Email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           icon={faUser}
//           width="w-full"
//           height="h-10"
//           type="email" // Added for email input
//         />
//         <CustomInput
//           label="Password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           icon={faLock}
//           width="w-full"
//           height="h-10"
//           type="password" // Added for password input
//         />
//         <CustomButton
//           title="Sign In"
//           trailingIcon={faSignInAlt}
//           type="submit" // For form submission
//         />
//       </form>
//       <p>
//         Don't have an account? <a href="/signup">Sign up</a>
//       </p>
//     </div>
//   );
// };

// export default SignIn;
