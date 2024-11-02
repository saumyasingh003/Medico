import React from "react";
import { FaSmileBeam } from "react-icons/fa";
import good1 from "../assets/good1.jpg";
import good2 from "../assets/good2.avif";
import good3 from "../assets/good3.jpg";

const Dashboard = () => {
  return (
    <div className="min-h-screen mt-10  bg-gradient-to-r from-[#a8edea] to-[#fed6e3] p-10">
      {/* Main Header */}
      <div className="  p-8 text-center">
        <h1 className="text-4xl font-bold text-[#007162] flex items-center justify-center mb-4">
          Welcome to MediCo Dashboard{" "}
          <FaSmileBeam size={50} className="text-yellow-400 ml-3" />
        </h1>
        <p className="text-gray-600 text-lg">
          Your ultimate healthcare companion! Discover insights, explore health
          solutions, and lead a better life with MediCo.
        </p>
      </div>

      {/* Dashboard Overview Section */}
      <div className="mt-12  bg-white shadow-lg rounded-lg p-8 mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold text-[#007162] mb-4">
          Dashboard Overview
        </h2>
        <p className="text-gray-700 mb-6">
          Our dashboard provides you with comprehensive health insights,
          connecting you to trusted resources to empower your health journey.
        </p>
        <p className="text-gray-700">
          From daily routines to finding the best health solutions, MediCo is
          here to guide you every step of the way.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex   justify-center space-x-8 mt-10 mx-auto">
        <div className="relative group">
          <img
            src={good1}
            className="w-56 h-56 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            alt="Good 1"
          />
          <p className="absolute bottom-4 left-0 right-0 text-center text-white font-semibold bg-[#007162]/70 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Health Insights
          </p>
        </div>

        <div className="relative group">
          <img
            src={good2}
            className="w-56 h-56 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            alt="Good 2"
          />
          <p className="absolute bottom-4 left-0 right-0 text-center text-white font-semibold bg-[#007162]/70 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Wellness Tips
          </p>
        </div>

        <div className="relative group">
          <img
            src={good3}
            className="w-56 h-56 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            alt="Good 3"
          />
          <p className="absolute bottom-4 left-0 right-0 text-center text-white font-semibold bg-[#007162]/70 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Expert Advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
