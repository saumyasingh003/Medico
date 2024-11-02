import React from "react";
import pt from "../assets/pt1.jpg";
import good1 from "../assets/good1.jpg";
import good2 from "../assets/good2.avif";
import good3 from "../assets/good3.jpg";
import axios from "axios"; // Import axios for API requests
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const Appointment = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .min(10, "Phone must be exactly 10 characters")
      .required("Phone number is required"),
    dob: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    date: Yup.date().required("Appointment date is required"),
    doctorFirstname: Yup.string().required("Doctor's first name is required"),
    doctorLastname: Yup.string().required("Doctor's last name is required"),
    department: Yup.string().required("Department is required"),
    hasVisited: Yup.string().required(
      "Please select if you have visited before"
    ),
    address: Yup.string().required("Address is required"),
  });

  return (
    <div>
      <Toaster /> {/* Place Toaster here for proper rendering */}
      <div className="mt-20 flex justify-center mb-10 w-full">
        <div
          className="p-8 shadow-lg text-center w-full h-[20em] text-white"
          style={{
            backgroundImage: `url(${pt})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-3xl font-semibold mb-4 mt-20">
            Book Your Appointment
          </h1>
          <p className="text-lg">
            The easiest and fastest way to book your appointment
          </p>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center text-[#007162] mb-6">
        Short Brief..
      </h1>
      <div className="flex flex-col items-start space-y-4 mt-8 text-center mb-10 pl-9">
        <p className="text-lg">
          <strong>•</strong> <strong>Enter Your Details:</strong> Fill in your
          name, contact information, and preferred appointment date and time.
        </p>
        <p className="text-lg">
          <strong>•</strong> <strong>Select Your Service:</strong> Choose the
          service or purpose of the appointment.
        </p>
        <p className="text-lg">
          <strong>•</strong> <strong>Submit and Confirm:</strong> Click{" "}
          <strong>"Book Appointment"</strong> to receive a confirmation of your
          booking.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex justify-start items-center min-h-screen bg-gray-100 px-10">
          <div className="w-full max-w-4xl px-10 md:px-20 py-12 bg-white rounded-2xl shadow-lg ml-10 mb-10 mt-10">
            <h2 className="text-3xl font-semibold text-[#007162] mb-8 text-center">
              Book an Appointment
            </h2>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                dob: "",
                gender: "",
                date: "",
                department: "",
                doctorFirstname: "",
                doctorLastname: "",
                hasVisited: "",
                address: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const response = await axios.post(
                    "https://medico-backend-wp55.onrender.com/appointment/send",
                    values
                  );
                  console.log(response.data);
                  toast.success("Appointment booked successfully!"); // Success notification
                  resetForm(); // Reset form data
                } catch (error) {
                  console.error("Error submitting appointment:", error);
                  toast.error("Error booking appointment. Please try again."); // Error notification
                }
              }}
            >
              {({ handleChange }) => (
                <Form className="space-y-6">
                  {/* Patient Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="firstname"
                        onChange={handleChange}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter First Name"
                      />
                      <ErrorMessage
                        name="firstname"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter Last Name"
                      />
                      <ErrorMessage
                        name="lastname"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        onChange={handleChange}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <Field
                        type="tel"
                        name="phone"
                        onChange={handleChange}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter Phone Number"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <Field
                        type="date"
                        name="dob"
                        onChange={handleChange}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <h3 className="text-2xl font-semibold text-[#007162] mt-8 mb-4">
                    Appointment Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Appointment Date
                    </label>
                    <Field
                      type="date"
                      name="date"
                      onChange={handleChange}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Doctor's First Name
                      </label>
                      <Field
                        type="text"
                        name="doctorFirstname"
                        onChange={handleChange}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter Doctor's First Name"
                      />
                      <ErrorMessage
                        name="doctorFirstname"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Doctor's Last Name
                      </label>
                      <Field
                        type="text"
                        name="doctorLastname"
                        onChange={handleChange}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                        placeholder="Enter Doctor's Last Name"
                      />
                      <ErrorMessage
                        name="doctorLastname"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <Field
                      as="select"
                      name="department"
                      onChange={handleChange}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                    >
                      <option value="">Select Department</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Gastroenterology">Gastroenterology</option>
                      <option value="Pulmonology">Pulmonology</option>
                      <option value="Endocrinology">Endocrinology</option>
                      <option value="Nephrology">Nephrology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Dermatology">Dermatology</option>
                    </Field>
                    <ErrorMessage
                      name="department"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Have you visited before?
                    </label>
                    <Field
                      as="select"
                      name="hasVisited"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                    <ErrorMessage
                      name="hasVisited"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <Field
                      type="text"
                      name="address"
                      onChange={handleChange}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#007162] focus:outline-none"
                      placeholder="Enter Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full p-4 bg-[#007162] text-white rounded-lg hover:bg-[#005b53] focus:outline-none"
                    >
                      Book Appointment
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="bg-gray-100 flex justify-center items-center py-10 px-5">
            <div className="grid grid-cols-1 gap-8">
              <img
                src={good1}
                alt="Image 1"
                className="rounded-full w-80 h-80 mx-auto shadow-lg"
              />
              <img
                src={good2}
                alt="Image 2"
                className="rounded-full w-80 h-80 mx-auto shadow-lg"
              />
              <img
                src={good3}
                alt="Image 3"
                className="rounded-full w-80 h-80 mx-auto shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Appointment;
