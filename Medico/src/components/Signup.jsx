import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import panda2 from "../assets/panda2.avif";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  phone: Yup.string().min(10 ,"Phone must be exactly 10 characters").required("Phone number is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const SignUp = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:4000/user/signup", values);
      toast.success(response?.data.message);
      window.location.href = "/";
      onClose();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Sign up failed!";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-3xl flex flex-col space-y-8">
        {/* Top Section */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <img src={panda2} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
            <h2 className="text-4xl font-bold text-[#007162]">Sign Up</h2>
          </div>
          <span onClick={onClose} className=" text-black p-2 rounded-full flex items-center justify-center cursor-pointer">
            <RxCross2 size={24} />
          </span>
        </div>

        {/* Form Section with Formik */}
        <Formik
          initialValues={{
            username: "",
            phone: "",
            email: "",
            password: "",
            role: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 w-full">
              {/* Name and Phone Number Row */}
              <div className="flex flex-col md:flex-row md:space-x-6 w-full">
                <div className="w-full">
                  <Field
                    name="username"
                    placeholder="Enter Name"
                    className="w-full p-4   border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="w-full mt-4 md:mt-0">
                  <Field
                    name="phone"
                    placeholder="Enter Phone Number"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Email and Password Row */}
              <div className="flex flex-col md:flex-row md:space-x-6 w-full">
                <div className="w-full">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="relative w-full mt-4 md:mt-0">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Role Selection */}
              <div className="flex items-center justify-center space-x-8 mt-6">
                {["admin", "patient"].map((roleOption) => (
                  <label key={roleOption} className="flex items-center space-x-2">
                    <Field type="radio" name="role" value={roleOption} className="form-radio text-[#007162]" />
                    <span>{roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}</span>
                  </label>
                ))}
                <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-60 bg-[#007162] hover:bg-green-900 text-white rounded-lg font-semibold mt-8"
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
