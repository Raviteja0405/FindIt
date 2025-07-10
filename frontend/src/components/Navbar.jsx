import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import sunIcon from "/lightMode.svg";
import moonIcon from "/nightMode.svg";

const Navbar = ({ darkmode, setDarkmode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.log("User not logged in. Error:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav
      className={`sticky top-4 z-50 mx-auto w-[70%] rounded-2xl backdrop-blur-md ${
        darkmode ? "bg-gray-500/30" : "bg-white/10"
      } shadow-lg flex items-center justify-between px-8 py-3 transition-all duration-300`}
    >
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-2">
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
      </Link>

      {/* Center: Links (hidden on small screens) */}
      <ul
        className={`flex gap-8 text-lg ${
          darkmode ? "text-gray-200" : "text-gray-800"
        } hidden md:flex`}
      >
        <li className="cursor-pointer hover:text-blue-500">
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          <Link to="/my-posts">My Posts</Link>
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          <Link to="/report-item">Report Item</Link>
        </li>
      </ul>

      {/* Right: Icons */}
      <div className="flex items-center gap-5">
        {/* Dark Mode Toggle */}
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

        {/* Profile Icon */}
        {user ? (
          <Link to="/profile">
            <img
              src={user.photo}
              alt="User"
              className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 hover:scale-105 transition"
            />
          </Link>
        ) : (
          <Link
            to="/login"
            className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
              darkmode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            Login
          </Link>
        )}
      </div>

      {/* Hamburger for Mobile */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={handleMenuToggle}
          className={`p-2 rounded-full transition-all duration-300 ${
            darkmode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <Menu
            className={`w-6 h-6 ${darkmode ? "text-white" : "text-gray-800"}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col absolute top-16 left-0 right-0 px-6 py-4 md:hidden z-50 rounded-b-2xl transition-all duration-300 ${
          darkmode ? "bg-[#253244] text-gray-200" : "bg-white text-gray-800"
        } shadow-lg`}
      >
        <ul className="flex flex-col gap-4 text-lg p-4 border-2 rounded-lg">
          <li className="cursor-pointer hover:text-blue-500">
            <Link to="/" onClick={handleMenuToggle}>
              Home
            </Link>
          </li>
          <li className="cursor-pointer hover:text-blue-500">
            <Link to="/my-posts" onClick={handleMenuToggle}>
              My Posts
            </Link>
          </li>
          <li className="cursor-pointer hover:text-blue-500">
            <Link to="/report-item" onClick={handleMenuToggle}>
              Report Item
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
