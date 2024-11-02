import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import logo from "../assets/logo.avif";

const Footer = () => {
  return (
    <footer className="  bg-[#b6ca75] shadow-lg text-gray-800 py-8">
  
      <div className="container mx-auto px-4  ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              <img src={logo} className="w-24 h-24 " />
            </h2>
            <p className="text-2xl font-bold  text-[#1E726E]">Medico</p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-600 text-[#1E726E] transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-600 text-[#1E726E] transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/appoinment"
                  className="hover:text-blue-600 text-[#1E726E] transition"
                >
                 Appointment
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-blue-600  text-[#1E726E]  transition"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Our Services</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 text-[#1E726E] transition"
                >
                  Health & LIbrary
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 text-[#1E726E] transition"
                >
                  News & Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 text-[#1E726E] transition"
                >
                  Health Camps
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 text-[#1E726E] transition"
                >
                  Bio Medical Report
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-blue-600 text-[#1E726E] transition"
              >
                <FaFacebookF  size={24} />
              </a>
              <a
                href="#"
                className="hover:text-blue-600 text-[#1E726E] transition"
              >
                <FaTwitter size={24}  />
              </a>
              <a
                href="#"
                className="hover:text-blue-600 text-[#1E726E] transition"
              >
                <FaInstagram  size={24} />
              </a>
              <a
                href="#"
                className="hover:text-blue-600 text-[#1E726E] transition"
              >
                <FaLinkedin  size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-6 pt-4 text-center text-[#1E726E] text-sm">
          <p>&copy; {new Date().getFullYear()} Medico. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
