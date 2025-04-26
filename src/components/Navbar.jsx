import React from "react";
import { Bell, User } from "lucide-react";
import sunIcon from "/lightMode.svg";
import moonIcon from "/nightMode.svg";

const Navbar = ({ darkmode, setDarkmode }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-sm bg-white dark:bg-gray-900 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        CampusFinder
      </div>

      {/* Center: Links */}
      <ul className="flex gap-8 text-gray-700 dark:text-gray-300 text-lg">
        <li className="cursor-pointer hover:text-blue-500">Home</li>
        <li className="cursor-pointer hover:text-blue-500">Lost Items</li>
        <li className="cursor-pointer hover:text-blue-500">Found Items</li>
        <li className="cursor-pointer hover:text-blue-500">My Posts</li>
        <li className="cursor-pointer hover:text-blue-500">Help</li>
      </ul>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Button */}
        <button
          onClick={() => setDarkmode(!darkmode)}
          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer ${
            darkmode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          {darkmode ? (
            <img
              src={sunIcon}
              alt="Light Mode"
              className="w-5 h-5 invert dark:invert-0"
            />
          ) : (
            <img
              src={moonIcon}
              alt="Dark Mode"
              className="w-5 h-5 invert dark:invert-0"
            />
          )}
        </button>

        {/* Bell Icon */}
        <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500" />

        {/* Profile Icon */}
        <User className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500" />
      </div>
    </nav>
  );
};

export default Navbar;
