import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CompleteProfile = ({ darkmode, setDarkmode }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    showPhone: false,
    showEmail: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "/api/users/complete-profile",
        {
          contactInfo: {
            phone: formData.phone,
            showPhone: formData.showPhone,
            showEmail: formData.showEmail,
          },
        },
        { withCredentials: true }
      );

      alert("Profile completed successfully!");
      navigate("/"); // or /report-item
    } catch (error) {
      console.error(error);
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkmode ? "bg-[#101828] text-white" : "bg-white text-black"} min-h-screen`}>
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />

      <div className="max-w-xl mx-auto p-6 mt-10 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={`p-3 rounded-md border ${darkmode ? "bg-[#283142] border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
            required
          />

          <label className="flex gap-2 items-center">
            <input type="checkbox" name="showPhone" checked={formData.showPhone} onChange={handleChange} />
            Show phone to others
          </label>

          <label className="flex gap-2 items-center">
            <input type="checkbox" name="showEmail" checked={formData.showEmail} onChange={handleChange} />
            Show email to others
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      <Footer darkmode={darkmode} />
    </div>
  );
};

export default CompleteProfile;
