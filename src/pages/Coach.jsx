import React from "react";
import { Link, Outlet } from "react-router-dom";

const Coach = () => {
  const useremail = localStorage.getItem("user_email");
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-rose-800 text-white text-center w-full">
        {useremail}
      </div>
      <Outlet />
    </div>
  );
};

export default Coach;
