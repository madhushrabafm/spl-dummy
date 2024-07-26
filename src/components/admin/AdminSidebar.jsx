// src/components/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="h-screen shadow-lg w-64 bg-pink-800/50 text-white flex flex-col">
      <div className="p-4 text-lg font-semibold bg-pink-900/50">
        Admin Sidebar
      </div>
      <nav className="flex-1 mt-4">
        <ul>
          <li>
            <Link
              to="/admin/team"
              className=" capitalize px-8 block p-4 hover:bg-pink-700/50"
            >
              team
            </Link>
          </li>
          <li>
            <Link
              to="/admin/coach"
              className=" capitalize px-8 block p-4 hover:bg-pink-700/50"
            >
              coach
            </Link>
          </li>
          <li>
            <Link
              to="/admin/players"
              className=" capitalize px-8 block p-4 hover:bg-pink-700/50"
            >
              players
            </Link>
          </li>
          <li>
            <Link
              to="/admin/drafts"
              className=" capitalize px-8 block p-4 hover:bg-pink-700/50"
            >
              drafts
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
