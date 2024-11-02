import React, { useState } from 'react';
import { FaSmileBeam, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddNewAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required("User name is required"),
    phone: Yup.string().min(10, "Phone must be exactly 10 characters").required("Phone number is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
  
      // Store the response from the POST request
      const response = await axios.post("https://medico-backend-wp55.onrender.com/user/admin/addnew", formData);
  
      // Show success message from the response
      toast.success(response.data?.message);
      resetForm();
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  
  

  return (
    <div className="overflow-x-hidden">
      <Toaster />
      <div className="mt-24   flex flex-col justify-center relative ">
        <h1 className="text-4xl text-center   mb-5 font-bold text-[#007162]  flex items-center justify-center">
          Add New Admin To the DashBoard!!
          <FaSmileBeam size={60} className="text-yellow-400 ml-2" />
        </h1>

       
            <div className="w-full md:px-20 py-10 bg-white rounded-2xl shadow-lg mx-5 mb-10 mt-10 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold text-[#007162] mb-8 text-center">
                Admin Registration
              </h2>
              <Formik
                initialValues={{
                  username: "",
                  phone: "",
                  email: "",
                  password: "",
                  avatar: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <Field name="username" className="w-full mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none" placeholder="Enter Username" />
                        <ErrorMessage name="username" component="div" className="text-red-600" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <Field name="phone" type="text" className="w-full mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none" placeholder="Enter Phone Number" />
                        <ErrorMessage name="phone" component="div" className="text-red-600" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <Field name="email" type="email" className="w-full mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none" placeholder="Enter Email" />
                        <ErrorMessage name="email" component="div" className="text-red-600" />
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <Field name="password" type={showPassword ? "text" : "password"} className="w-full  mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none" placeholder="Enter Password" />
                        <ErrorMessage name="password" component="div" className="text-red-600" />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500">
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="w-[20em] mt-4 bg-[#007162] text-white p-4 rounded-lg hover:bg-[#005A51] transition duration-300"
                      >
                        Register Admin
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
        
      </div>
    </div>
  );
};

export default AddNewAdmin;
