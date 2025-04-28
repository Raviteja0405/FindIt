import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ItemGrid from "../components/ItemGrid";
import Footer from "../components/Footer";

// Dummy Found Items Data
const foundItemsData = [
  {
    id: 1,
    title: "Blue Backpack",
    status: "Found",
    description: "Found near the library. Contains books and a water bottle.",
    location: "Library",
    date: "2025-04-27",
    image: "https://via.placeholder.com/300x200?text=Backpack",
  },
  {
    id: 2,
    title: "Smartphone",
    status: "Found",
    description: "Found at cafeteria. Black case, locked screen.",
    location: "Cafeteria",
    date: "2025-04-26",
    image: "https://via.placeholder.com/300x200?text=Smartphone",
  },
  {
    id: 3,
    title: "Keys",
    status: "Found",
    description: "Set of keys found near the main auditorium.",
    location: "Auditorium",
    date: "2025-04-25",
    image: "https://via.placeholder.com/300x200?text=Keys",
  },
];

const FoundItems = ({ darkmode, setDarkmode }) => {
  return (
    <div className={`${darkmode ? "bg-[#1A2330] text-white" : "bg-gray-50 text-black"}  flex flex-col`}>
      {/* Navbar */}
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />
      <div className="px-8 py-3 max-w-7xl mx-auto">
        {/* Hero Section (reused with different heading) */}
        <HeroSection darkmode={darkmode} title="Found Items" subtitle="Items that have been found around campus." type="found"/>

        {/* Grid of Found Items */}
        <div className="flex-grow">
          <ItemGrid darkmode={darkmode} items={foundItemsData} />
        </div>
        <div className="flex justify-center my-10">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-semibold transition">
            Load More Items
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FoundItems;
