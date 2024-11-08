import React, { useState } from "react";
import logo from "../assets/logo.avif";


const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <nav className="bg-white py-2 text-[#007162] dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 lg:px-8 py-2">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-10 w-10" alt="Medico Logo" />
            <span className="text-2xl font-semibold text-[#007162] dark:text-white">
              Medico
            </span>
          </a>

          <div className="flex md:order-2 space-x-4">
            <a href="/admin/login"
              type="button"
              onClick={openModal}
              className="text-white px-4 py-2 bg-[#007162] hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-[#218380] font-medium rounded-lg text-md"
            >
              Get Started
            </a>

            

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 p-3 md:p-0 mt-4 md:mt-0 font-medium bg-gray-50 md:bg-transparent border border-gray-100 rounded-lg md:border-0 dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a
                  href="/admin/dashboard"
                  className="block py-2 px-5 text-[#218380] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#007162] dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Dashboard
                </a>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
