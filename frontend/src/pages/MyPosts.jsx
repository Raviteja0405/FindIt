import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ItemGrid from "../components/ItemGrid";
import Footer from "../components/Footer";

const MyPosts = ({ darkmode, setDarkmode }) => {
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/items/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch your items");
        const data = await res.json();
        setMyItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, []);

  const handleEdit = (item) => {
    navigate(`/edit-item/${item._id}`, { state: item });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/items/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete item");

      setMyItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Error deleting item");
      console.error(err);
    }
  };

  return (
    <div className={`${darkmode ? "bg-[#1A2330] text-white" : "bg-gray-50 text-black"} flex flex-col min-h-screen`}>
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />

      <main className="w-full px-4 sm:px-6 lg:px-16 py-8 mx-auto max-w-7xl">
        <HeroSection
          darkmode={darkmode}
          title="My Posts"
          subtitle="Manage the items you've reported as lost or found."
          type="both"
        />

        <div className="flex-grow mt-6">
          {loading ? (
            <p className="text-center mt-10 text-gray-400">Loading your items...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-10">{error}</p>
          ) : myItems.length > 0 ? (
            <ItemGrid
              darkmode={darkmode}
              items={myItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center text-lg mt-12">
              You haven't posted any items yet.
            </div>
          )}
        </div>
      </main>

      <Footer darkmode={darkmode} />
    </div>
  );
};

export default MyPosts;
