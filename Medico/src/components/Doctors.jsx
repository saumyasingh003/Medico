import React, { useState } from "react";
import axios from "axios";
import pt from "../assets/pt1.jpg";
import toast, { Toaster } from "react-hot-toast";

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Select Department");
  const [doctors, setDoctors] = useState([]); 
  const [numberOfDoctors, setNumberOfDoctors] = useState(0);

  const departments = [
    "Cardiology",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Gastroenterology",
    "Pulmonology",
    "Endocrinology",
    "Nephrology",
    "Pediatrics",
    "Dermatology",
  ];

  const handleDepartmentChange = (e) => {
    const selected = e.target.value;
    setSelectedDepartment(selected);
    setSearchTerm(selected);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (selectedDepartment === "Select Department") {
      toast.error("Please select a department");
      return;
    }

    try {
      const response = await axios.get(
        `https://medico-backend-wp55.onrender.com/doctor/department/${selectedDepartment}`
      );

      const data = response.data;
      setDoctors(data.doctors || []);
      setNumberOfDoctors(data.numberOfDoctors || 0);
      toast.success(
        data.message ||
          "Doctors retrieved successfully for the given department"
      );
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "There are no doctors for the particular department!"
      );
      toast.error(errorMessage);
      setDoctors([]);
      setNumberOfDoctors(0);
    }
  };

  return (
    <>
      <Toaster /> 
      <div
        className="p-8 shadow-lg text-center w-full h-[20em] text-white"
        style={{
          backgroundImage: `url(${pt})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl font-semibold mb-4 mt-28">
          Find Best Doctor For You
        </h1>
      </div>
      <div className="mt-8 mb-60">
        <form onSubmit={handleSearch} className="max-w-lg mx-auto mt-8">
          <div className="flex items-center">
            <div className="relative">
              <select
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className="block appearance-none w-48 h-[3.4em] bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-l-lg focus:outline-none"
              >
                <option disabled>Select Department</option>
                {departments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for doctors..."
              className="block p-3 w-full  text-lg text-gray-900 bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="p-5 text-sm font-medium h-full text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="w-4 h-4 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
        {numberOfDoctors > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-center">
              Number of Doctors: {numberOfDoctors}
            </h2>
            <ul className="mt-4 ml-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <li
                  key={doctor._id}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <img
                    src={doctor.avatar.url}
                    alt={doctor.firstname}
                    className="w-full h-[20em] object-cover rounded-t-lg"
                  />
                  <div className="mt-4 px-7 pb-2">
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      Dr. {doctor.firstname} {doctor.lastname}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Department: {doctor.doctorDepartment}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      Experience: {doctor.experience}+ years
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Email: {doctor.email}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Phone: {doctor.phone}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Doctors;
