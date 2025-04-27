import React from "react";
import { Link } from "react-router-dom";
import { Bell, User } from "lucide-react";
import sunIcon from "/lightMode.svg";
import moonIcon from "/nightMode.svg";

const Navbar = ({ darkmode, setDarkmode }) => {
  return (
    <nav
      className={`sticky top-4 z-50 mx-auto w-[95%] rounded-2xl backdrop-blur-md bg-white/10 dark:bg-[#f9fafb
]/30 shadow-lg flex items-center justify-between px-8 py-3 transition-all duration-300`}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/FindItLogo.svg"
          alt="FindIt Logo"
          className={`w-6 h-6 object-contain ${
            darkmode ? "invert" : ""
          } transition-all duration-300`}
        />
        <span
          className={`${
            darkmode ? "text-gray-100" : "text-gray-800"
          } text-xl font-bold`}
        >
          FindIt
        </span>
      </div>

      {/* Center: Links */}
      <ul
        className={`flex gap-8 text-lg ${
          darkmode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        <li className="cursor-pointer hover:text-blue-500">
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          <Link to="/lost-items">Lost Items</Link>
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          <Link to="/found-items">Found Items</Link>
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          <Link to="/my-posts">My Posts</Link>
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          <Link to="/report-item">Help</Link>
        </li>
      </ul>

      {/* Right: Icons */}
      <div className="flex items-center gap-5">
        {/* Dark Mode Button */}
        <button
          onClick={() => setDarkmode(!darkmode)}
          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
            darkmode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          {darkmode ? (
            <img
              src={sunIcon}
              alt="Light Mode"
              className="w-5 h-5 filter invert"
            />
          ) : (
            <img
              src={moonIcon}
              alt="Dark Mode"
              className="w-5 h-5 filter invert"
            />
          )}
        </button>

        {/* Bell Icon */}
        <Bell
          className={`w-6 h-6 cursor-pointer ${
            darkmode ? "text-white" : "text-gray-800"
          } hover:text-blue-500`}
        />

        {/* Profile Icon */}
        <User
          className={`w-6 h-6 cursor-pointer ${
            darkmode ? "text-white" : "text-gray-800"
          } hover:text-blue-500`}
        />
      </div>
    </nav>
  );
};

export default Navbar;
