import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import panda1 from "../assets/panda1.png";
import Signup from "./Signup";
import  toast ,{Toaster} from "react-hot-toast";
import axios from "axios";

const Login = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });
     
      // Store user info and token in localStorage

      console.log(response.data)
      if(response.data.success === true){

        toast.success(response.data.message);
        window.location.href = "/ "
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("user", JSON.stringify(response.data.user));

  
   
    } catch(error) {
      const errorMessage = error.response?.data?.message
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Toaster/>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl flex">
        {/* Left Side - Image */}
        <div className="w-1/2">
          <img
            src={panda1}
            alt="Login Visual"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-[#007162]">Login</h2>
            </div>
            <span
              onClick={onClose}
              className="p-2 text-black mb-5 items-center justify-center cursor-pointer"
            >
              <RxCross2 size={24} />
            </span>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#218380] focus:border-[#218380]"
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#218380] focus:border-[#218380]"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-[8em] bg-[#007162] hover:bg-green-900 text-white px-4 py-2 rounded-md font-medium"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => setSignUpOpen(true)}
              className="text-[#007162] font-medium cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {/* Sign-Up Modal */}
      <Signup isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} />
    </div>
    </>
    
  );
};

export default Login;
