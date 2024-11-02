import React from "react";
import admin1 from "../assets/admin1.avif";
import logo from "../assets/logo.avif";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("https://medico-backend-wp55.onrender.com/user/admin/login", {
        email: values.email,
        password: values.password,
      });
  
      if (response.data.success) {
        // Store user data in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        // Show success toast and navigate
        toast.success(response.data.message || "Login successful!");
        setTimeout(() => {
          window.location.href = "/admin";
        }, 500); // Delay redirect to allow toast to show
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed! Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <>
      <Toaster />

      <div className="flex h-screen w-full">
        {/* Left Side - Image */}
        <div className="w-1/2 h-full bg-gray-800">
          <img
            src={admin1}
            className="object-cover w-full h-full"
            alt="Admin"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 h-full flex items-center justify-center p-10 bg-white">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Admin Logo" className="h-32 w-32" />
            </div>

            <h2 className="text-3xl font-semibold text-center mb-6">
              Admin Login
            </h2>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
