import React, { useState } from "react";
import {
  FaCalendarCheck,
  FaCommentDots,
  FaUserMd,
  FaUserPlus,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ children }) => {
  const [activeItem, setActiveItem] = useState();

  return (
    <div>
      <div className="fixed left-0 top-0 h-screen w-64 mt-[4em] bg-[#007162] text-white flex flex-col items-start p-4">
        <h2 className="text-lg font-bold mb-8 mt-5 ml-10">Admin Panel</h2>

        <a
          href="/admin/appointments"
          onClick={() => setActiveItem("Appointments")}
          className={`flex items-center gap-3 w-full py-2 px-3 my-1 rounded-md text-left ${
            activeItem === "Appointments"
              ? "text-green-900 font-semibold bg-white"
              : "text-gray-500 bg-white"
          } transition-all duration-200`}
        >
          <FaCalendarCheck />
          Appointments
        </a>

        <a
          href="/admin/feedbacks"
          onClick={() => setActiveItem("Feedback")}
          className={`flex items-center gap-3 w-full py-2 px-3 my-1 rounded-md text-left ${
            activeItem === "Feedback"
              ? "text-green-900 font-semibold bg-white"
              : "text-gray-500 bg-white"
          } transition-all duration-200`}
        >
          <FaCommentDots />
          Feedbacks
        </a>

        <a
          href="/admin/doctor/addnew"
          onClick={() => setActiveItem("Add Doctor")}
          className={`flex items-center gap-3 w-full py-2 px-3 my-1 rounded-md text-left ${
            activeItem === "Add Doctor"
              ? "text-green-900 font-semibold bg-white"
              : "text-gray-500 bg-white"
          } transition-all duration-200`}
        >
          <FaUserMd />
          Add Doctor
        </a>

        <a
          href="/admin/addnew"
          onClick={() => setActiveItem("Add New Admin")}
          className={`flex items-center gap-3 w-full py-2 px-3 my-1 rounded-md text-left ${
            activeItem === "Add New Admin"
              ? "text-green-900 font-semibold bg-white"
              : "text-gray-500 bg-white"
          } transition-all duration-200`}
        >
          <FaUserPlus />
          Add New Admin
        </a>

        <a
          href="/admin/doctors"
          onClick={() => setActiveItem("Doctors")}
          className={`flex items-center gap-3 w-full py-2 px-3 my-1 rounded-md text-left ${
            activeItem === "Doctors"
              ? "text-green-900 font-semibold "
              : "text-gray-500 bg-white"
          } transition-all duration-200`}
        >
          <FaUserShield />
          Doctors
        </a>


        <a
      
          onClick={() => {
            setActiveItem("Logout");
          localStorage.clear();
          window.location.href = "/admin/login"
          }}
          className={`flex items-center gap-3 w-full py-2 px-3 my-1 rounded-md text-left ${
            activeItem === "Logout"
              ? "text-green-900 font-semibold"
              : "text-gray-500 bg-white"
          } transition-all duration-200`}
        >
          <FaSignOutAlt /> 
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
