import React from "react";
import { Link } from "react-router-dom";

const Header = ({ heading, link, linkname }) => {
  return (
    <header className="bg-gray-800 capitalize text-white p-3 px-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{heading}</h1>
        {link && (
          <Link
            to={link}
            className="bg-rose-500 text-sm text-white px-4 py-2 rounded hover:bg-rose-600"
          >
            {linkname}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
