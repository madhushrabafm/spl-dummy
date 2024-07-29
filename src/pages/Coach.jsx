import React from "react";
import { Link, Outlet } from "react-router-dom";

const Coach = () => {
  return (
    <div className="flex">
      <div className="flex h-screen items-center justify-center w-full   ">
        <Link>{` madhu  `}</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Coach;
