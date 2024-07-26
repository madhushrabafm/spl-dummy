import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex ">
      <div className="side">
        <AdminSidebar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
