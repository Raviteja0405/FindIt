import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ReportItem = ({ darkmode, setDarkmode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get("type") || "lost";

  const [checkingAuth, setCheckingAuth] = useState(true); // 🔐 New state for auth check
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    type: initialType,
    title: "",
    description: "",
    location: "",
    date: "",
    image: null,
    category: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true,
        });
      } catch (err) {
        console.log("Error checking auth:", err);
        navigate("/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && key !== "image") {
          formPayload.append(key, value);
        }
      });
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      const res = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        body: formPayload,
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to report item");
      }

      const result = await res.json();
      alert(result.message || "Item reported successfully!");
      navigate("/my-posts");
    } catch (error) {
      console.error("Error reporting item:", error);
      alert(error.message || "Failed to report item");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
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

        {checkingAuth ? (
          <div className="text-center text-gray-400">
            Checking authentication...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex justify-center gap-6">
              {["lost", "found"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
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

            <input
              type="text"
              name="title"
              placeholder="Item Title"
              value={formData.title}
              onChange={handleChange}
              className={`p-3 rounded-md border ${
                darkmode
                  ? "bg-[#283142] border-gray-600 text-white"
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
              className={`p-3 rounded-md border resize-none ${
                darkmode
                  ? "bg-[#283142] border-gray-600 text-white"
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
              className={`p-3 rounded-md border ${
                darkmode
                  ? "bg-[#283142] border-gray-600 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`p-3 rounded-md border ${
                darkmode
                  ? "bg-[#283142] border-gray-600 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Bags & Containers">Bags & Containers</option>
              <option value="Documents & Papers">Documents & Papers</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]} // 👈 restricts future dates
              className={`p-3 rounded-md border ${
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
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="mt-2 max-h-48 rounded-md object-contain"
              />
            )}

            <button
              type="submit"
              disabled={uploading}
              className={`bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-all ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? "Uploading..." : "Submit Report"}
            </button>
          </form>
        )}
      </div>

      <Footer darkmode={darkmode} />
    </div>
  );
};

export default ReportItem;
