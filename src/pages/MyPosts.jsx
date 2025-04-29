import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ItemGrid from "../components/ItemGrid";
import Footer from "../components/Footer";

// Dummy user-posted items (replace with actual API data if available)
const dummyMyItems = [
  {
    id: 1,
    title: "Lost Wallet",
    status: "Lost",
    description: "Black leather wallet lost near parking lot.",
    location: "Parking Area",
    date: "2025-04-24",
    image: "https://teakwoodleathers.com/cdn/shop/products/T_WLT_140_BL..1_1080x.jpg?v=1640337382",
  },
  {
    id: 2,
    title: "Found Earbuds",
    status: "Found",
    description: "Found wireless earbuds at gym locker room.",
    location: "Gym",
    date: "2025-04-25",
    image: "https://preview.redd.it/i-lost-one-of-my-brand-new-earbuds-the-day-before-leaving-v0-w7o4o5qryskd1.jpeg?auto=webp&s=08187062106524a72d17a0663cf15c4410b6f7ff",
  },
  {
    id: 3,
    title: "Lost Wallet",
    status: "Lost",
    description: "Black leather wallet lost near parking lot.",
    location: "Parking Area",
    date: "2025-04-24",
    image: "https://teakwoodleathers.com/cdn/shop/products/T_WLT_140_BL..1_1080x.jpg?v=1640337382",
  },
];

const MyPosts = ({ darkmode, setDarkmode }) => {
  const [myItems, setMyItems] = useState(dummyMyItems);

  const handleEdit = (item) => {
    alert(`Edit clicked for: ${item.title}`);
    // Open modal or navigate to edit form if needed
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const updatedItems = myItems.filter((item) => item.id !== id);
      setMyItems(updatedItems);
    }
  };

  return (
    <div className={`${darkmode ? "bg-[#1A2330] text-white" : "bg-gray-50 text-black"} flex flex-col`}>
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />

      <div className="px-40 py-4 w-full mx-auto">
        <HeroSection
          darkmode={darkmode}
          title="My Posts"
          subtitle="Manage the items you've reported as lost or found."
          type="both"
        />

        {/* Item Grid with edit/delete buttons */}
        <div className="flex-grow">
          {myItems.length > 0 ? (
            <ItemGrid
              darkmode={darkmode}
              items={myItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center text-lg mt-12">You haven't posted any items yet.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyPosts;