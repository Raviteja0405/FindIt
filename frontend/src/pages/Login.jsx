import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Decoded user info:", decoded);
    // Example: decoded.name, decoded.email, decoded.picture
    // Use this info to store user data or trigger backend login
  };
  
  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Welcome to FindIt</h1>
        <p className="text-gray-600 mb-6">
          SignIn to report or find lost items on campus.
        </p>
        <div className="flex justify-center">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
