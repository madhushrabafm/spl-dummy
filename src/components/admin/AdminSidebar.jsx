// src/components/AdminSidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const nav = useNavigate();
  return (
    <div className="min-h-screen h-full shadow-lg md:w-64 w-32 bg-pink-800/50 text-white flex flex-col">
      <div className="p-4 px-8 text-lg font-semibold bg-pink-900/50">
        Admin Sidebar
      </div>
      <nav className="flex-1 flex flex-col justify-between  mt-4 ">
        <ul className=" divide-y divide-rose-700">
          <li>
            <Link
              to="/admin/league"
              className=" capitalize px-8 block p-4 hover:bg-pink-700/50"
            >
              league
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
              to="/admin/drafts"
              className=" capitalize px-8 block p-4 hover:bg-pink-700/50"
            >
              drafts
            </Link>
          </li>
        </ul>
        <button
          onClick={() => nav("/")}
          className="logout mb-12 bg-rose-800 text-white p-2 capitalize mx-auto rounded-md px-7 w-fit"
        >
          logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
