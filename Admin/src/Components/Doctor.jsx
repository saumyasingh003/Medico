import React, { useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/doctor/viewDoctor");
        setDoctors(response.data.doctors); 
      } catch (error) {
        toast.error("Failed to fetch doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to reverse this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:4000/doctor/deleteDoctor/${id}`); // Use the correct ID format
          
          // Use success message from backend
          Swal.fire("Deleted!", response.data.message, "success");

          // Update state to remove the deleted doctor from the UI
          setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== id));
        } catch (error) {
          console.error("Error deleting doctor:", error);
          
          // Use error message from backend if available
          const errorMessage = error.response?.data?.message || "There was a problem deleting the doctor.";
          Swal.fire("Error!", errorMessage, "error");
        }
      }
    });
  };

  return (
    <div className="overflow-x-hidden">
      <Toaster />
      <div className="mt-24 flex flex-col justify-center relative">
        <h1 className="text-4xl text-center mb-5 font-bold text-[#007162] flex items-center justify-center">
          Doctors in Our Team!!
          <FaUserDoctor size={60} className="text-red-400 ml-2" />
        </h1>
        <h2 className="text-center text-lg text-gray-600">
          Total Number of Doctors: {doctors.length}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-10">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          Array.isArray(doctors) &&
          doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center relative"
            >
              <MdDelete
                size={28}
                className="text-red-500 absolute top-2 right-2 cursor-pointer"
                onClick={() => handleDelete(doctor._id)}
              />
              <img
                src={doctor.avatar.url}
                alt={`${doctor.firstname} ${doctor.lastname}`}
                className="w-32 h-32 rounded-full mb-4" // Increased avatar size
              />
              <h3 className="text-xl font-semibold text-[#007162]">
                 Dr. {" "}{doctor.firstname} {doctor.lastname}
              </h3>
              <p className="text-gray-700">Department: {doctor.doctorDepartment}</p>
              <p className="text-gray-700">Phone: {doctor.phone}</p>
              <p className="text-gray-700">Email: {doctor.email}</p>
              <p className="text-gray-500">Experience: {doctor.experience}+ years</p>
              <p className="text-gray-500">DOB: {doctor.dob}</p>
              <p className="text-gray-500">Gender: {doctor.gender}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Doctor;
