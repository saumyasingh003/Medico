import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddDoctor = () => {
  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    dob: Yup.date().required("Date of birth is required"),
    experience: Yup.number()
      .required("Experience is required")
      .min(0, "Experience must be a positive number"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string()
      .min(10, "Phone must be exactly 10 characters")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    doctorDepartment: Yup.string().required("Doctor's department is required"),
    avatar: Yup.mixed().required("Avatar is required"),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      data.append(key, values[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/doctor/addDoctor",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      resetForm();

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full">
        <div className="mt-20 flex flex-col justify-center relative">
          <h1 className="text-4xl text-center font-bold text-[#007162] mb-2 flex items-center justify-center">
            Add Doctors To Our Team!!
            <FaUserDoctor size={60} className="text-green-700 ml-2" />
          </h1>

          <div className="w-fit md:px-20 py-5 bg-white rounded-2xl shadow-lg mx-5 mb-2">
            <h2 className="text-3xl font-semibold text-[#007162] mb-8 text-center">
              Doctor Registration
            </h2>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                dob: "",
                experience: "",
                gender: "",
                phone: "",
                email: "",
                password: "",
                doctorDepartment: "",
                avatar: null,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:pr-4">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <Field
                        name="firstname"
                        className="w-[20em] mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter First Name"
                      />
                      <ErrorMessage
                        name="firstname"
                        component="div"
                        className="text-red-600"
                      />
                    </div>

                    <div className="md:pr-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <Field
                        name="lastname"
                        className="w-[20em] mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter Last Name"
                      />
                      <ErrorMessage
                        name="lastname"
                        component="div"
                        className="text-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <Field
                        name="dob"
                        type="date"
                        className="w-[20em] mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:pr-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Experience (Years)
                      </label>
                      <Field
                        name="experience"
                        type="number"
                        className="w-[20em] mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter Experience"
                      />
                      <ErrorMessage
                        name="experience"
                        component="div"
                        className="text-red-600"
                      />
                    </div>

                    <div className="md:pr-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <Field
                        name="gender"
                        as="select"
                        className="w-[20em] mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <Field
                        name="phone"
                        type="text"
                        className="w-[20em] mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter Phone Number"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:pr-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="w-[20em] mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-600"
                      />
                    </div>

                    <div className="md:pr-4 relative">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="w-[20em] mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-600"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 top-6 right-9 flex items-center cursor-pointer text-gray-500"
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Doctor's Department
                      </label>
                      <Field
                        name="doctorDepartment"
                        as="select"
                        className="w-[20em] mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                      >
                        <option value="">Select Department</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Oncology">Oncology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Gastroenterology">
                          Gastroenterology
                        </option>
                        <option value="Pulmonology">Pulmonology</option>
                        <option value="Endocrinology">Endocrinology</option>
                        <option value="Nephrology">Nephrology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Dermatology">Dermatology</option>
                      </Field>
                      <ErrorMessage
                        name="doctorDepartment"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Avatar
                    </label>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={(event) =>
                        setFieldValue("avatar", event.currentTarget.files[0])
                      }
                      className="w-[30em] mt-1 p-4 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                    />
                    <ErrorMessage
                      name="avatar"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-[20em] mt-4 bg-[#007162] text-white p-4 rounded-lg hover:bg-[#005A51] transition duration-300"
                    >
                      Register Doctor
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDoctor;
