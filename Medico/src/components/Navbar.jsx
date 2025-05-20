import React, { useState } from "react";
import logo from "../assets/logo.avif";
import Login from "./Login";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useAuth } from "./context_api/AuthContext";
import Signup from "./Signup";
const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [SignUpOpen, setSignUpOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const openModal = () => {
    if (!isAuthenticated) {
      setModalOpen(true);
    } else {
      handleLogout();
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const closeModal = () => setModalOpen(false);
  return (
    <div>
      <nav className="bg-white  py-2 text-[#007162]  dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-12 w-12" alt="Medico Logo" />
            <span className="self-center text-2xl font-semibold text-[#007162] dark:text-white">
              Medico
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
            <div>
          
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <a onClick={openModal}>
                          {isAuthenticated ? "Logout" : "Login"}
                        </a>
                      ),
                      key: "0",
                    },
                    {
                      label: <a onClick={setSignUpOpen}>SignUp</a>,
                      key: "1",
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="text-white px-3 bg-[#007162] hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-[#218380] font-medium rounded-lg text-md flex items-center space-x-2"
                  >
                    <span>Click me</span>
                    <DownOutlined />
                  </button>
                 
                </a>
              </Dropdown>
              <Signup
                isOpen={SignUpOpen}
                onClose={() => setSignUpOpen(false)}
              />

            

              {/* Modal Component */}
              <Login isOpen={isModalOpen} onClose={closeModal} />
            </div>

             <a href="https://medico-admin-two.vercel.app/admin/login" target="_blank" className="inline-block px-4 py-2 bg-green-800 rounded-lg text-white hover:text-white hover:bg-green-700">
  Admin Panel
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
            <ul className="flex flex-col p-3 md:p-0 mt-3 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-6 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-1 px-4  text-[#218380]  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#007162] md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block py-1 px-4  text-[#218380]  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#007162] md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/appointment"
                  className="block py-1 px-4  text-[#218380]  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#007162] md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Appointments
                </a>
              </li>
              <li>
                <a
                  href="/doctors"
                  className="block py-1 px-4  text-[#218380]  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#007162] md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Doctors
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
