import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const ReportItem = ({ darkmode, setDarkmode }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get("type") || "lost";

  const [formData, setFormData] = useState({
    type: initialType,
    title: "",
    description: "",
    location: "",
    date: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Item reported successfully!");
    // Submit logic here
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkmode ? "bg-[#101828] text-white" : "bg-white text-black"
      }`}
    >
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />

      <div
        className={`max-w-2xl mx-auto p-6 mt-8 rounded-lg shadow-md ${
          darkmode ? "bg-[#1B2431]" : "bg-gray-100"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Report Lost or Found Item
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Radio Buttons */}
          <div className="flex justify-center gap-6">
            {["lost", "found"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={formData.type === type}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>

          {/* Input Fields */}
          <input
            type="text"
            name="title"
            placeholder="Item Title"
            value={formData.title}
            onChange={handleChange}
            className={`p-3 rounded-md outline-none border ${
              darkmode
                ? "bg-[#283142] border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-black"
            }`}
            required
          />

          <textarea
            name="description"
            placeholder="Item Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`p-3 rounded-md outline-none border resize-none ${
              darkmode
                ? "bg-[#283142] border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-black"
            }`}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Where was it lost/found?"
            value={formData.location}
            onChange={handleChange}
            className={`p-3 rounded-md outline-none border ${
              darkmode
                ? "bg-[#283142] border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-black"
            }`}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`p-3 rounded-md outline-none border ${
              darkmode
                ? "bg-[#283142] border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className={`p-2 rounded-md border ${
              darkmode
                ? "bg-[#283142] border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-all"
          >
            Submit Report
          </button>
        </form>
      </div>

      <Footer darkmode={darkmode} />
    </div>
  );
};

export default ReportItem;
