import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Profile = ({ darkmode, setDarkmode }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    showPhone: false,
    showEmail: true,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data);
        setFormData({
          phone: res.data.contactInfo?.phone || "",
          showPhone: res.data.contactInfo?.showPhone || false,
          showEmail: res.data.contactInfo?.showEmail ?? true,
        });
      } catch (err) {
        console.error("Error fetching profile", err);
        navigate("/login"); // Redirect to login if not authenticated
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:3000/api/users/me",
        { contactInfo: formData },
        { withCredentials: true }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      alert("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Failed to logout");
    }
  };

  // Delete account
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      await axios.delete("http://localhost:3000/api/users/me", {
        withCredentials: true,
      });
      alert("Account deleted. Redirecting...");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading profile...</div>;
  console.log(user);

  return (
    <div
      className={`${
        darkmode ? "bg-[#101828] text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />

      <div className="max-w-2xl mx-auto mt-10 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

        <div className="mb-8 text-center">
          <img
            src={user?.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-2"
          />
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={`p-3 rounded-md border ${
              darkmode
                ? "bg-[#283142] border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="showPhone"
              checked={formData.showPhone}
              onChange={handleChange}
            />
            Show phone to others
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="showEmail"
              checked={formData.showEmail}
              onChange={handleChange}
            />
            Show email to others
          </label>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-md font-semibold transition"
          >
            Logout
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-semibold transition"
          >
            Delete My Account
          </button>
        </form>
      </div>

      <Footer darkmode={darkmode} />
    </div>
  );
};

export default Profile;
