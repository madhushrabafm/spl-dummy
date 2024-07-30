import React from "react";
import { Link, Outlet } from "react-router-dom";

const Coach = () => {
  return (
    <div className="flex">
      <Outlet />
    </div>
  );
};

export default Coach;
