import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const EditItem = ({ darkmode, setDarkmode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const item = location.state;

  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    location: item.location,
    date: item.date.split("T")[0],
    type: item.type,
    category: item.category,
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState(item.imageUrl);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("location", formData.location);
      formPayload.append("date", formData.date);
      formPayload.append("type", formData.type);
      formPayload.append("category", formData.category);
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      const res = await axios.put(`http://localhost:3000/api/items/${id}`, formPayload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.message || "Item updated successfully!");
      navigate("/my-posts");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${darkmode ? "bg-[#101828] text-white" : "bg-white text-black"} min-h-screen`}>
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />

      <div className="max-w-2xl mx-auto p-6 mt-8 rounded-lg shadow-md bg-opacity-80">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Item</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Type */}
          <div className="flex justify-center gap-6">
            {["lost", "found"].map((typeOption) => (
              <label key={typeOption} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value={typeOption}
                  checked={formData.type === typeOption}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                <span className="capitalize">{typeOption}</span>
              </label>
            ))}
          </div>

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Item Title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 rounded-md border"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Item Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="p-3 rounded-md border resize-none"
            required
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Where was it lost/found?"
            value={formData.location}
            onChange={handleChange}
            className="p-3 rounded-md border"
            required
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-3 rounded-md border"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 rounded-md border"
            required
          >
            <option value="">Select Category</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Clothing</option>
            <option>Bags & Containers</option>
            <option>Documents & Papers</option>
            <option>Other</option>
          </select>

          {/* Image Upload */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="p-2 rounded-md border"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 max-h-48 rounded-md object-contain"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Updating..." : "Update Item"}
          </button>
        </form>
      </div>

      <Footer darkmode={darkmode} />
    </div>
  );
};

export default EditItem;
