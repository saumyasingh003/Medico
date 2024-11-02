import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar.jsx";

const Layout = () => {
  return (
    <div className="flex">
    <Sidebar />
    <div className="ml-64  flex-1">
      <Outlet />
    </div>
  </div>
  );
};

export default Layout;
