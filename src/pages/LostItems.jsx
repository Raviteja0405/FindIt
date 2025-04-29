import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ItemGrid from "../components/ItemGrid";
import Footer from "../components/Footer";

// Dummy Lost Items Data
const lostItemsData = [
  {
    id: 1,
    title: "Black Wallet",
    status: "Lost",
    description: "Lost near the campus cafeteria. Contains ID and some cash.",
    location: "Cafeteria",
    date: "2025-04-24",
    image: "https://teakwoodleathers.com/cdn/shop/products/T_WLT_140_BL..1_1080x.jpg?v=1640337382",
  },
  {
    id: 2,
    title: "Silver Laptop",
    status: "Lost",
    description: "Left behind in the lecture hall after class.",
    location: "Lecture Hall A",
    date: "2025-04-23",
    image: "https://images.pexels.com/photos/5951553/pexels-photo-5951553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    title: "Water Bottle",
    status: "Lost",
    description: "Lost somewhere in the sports ground during practice.",
    location: "Sports Ground",
    date: "2025-04-22",
    image: "https://m.media-amazon.com/images/I/4121l07JxoL.jpg",
  },
];

const LostItems = ({ darkmode, setDarkmode }) => {
  return (
    <div className={`${darkmode ? "bg-[#1A2330] text-white" : "bg-gray-50 text-black"} flex flex-col`}>
      {/* Navbar */}
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />

      <div className="px-8 py-3 max-w-7xl mx-auto">
        {/* Hero Section (reused with different heading) */}
        <HeroSection darkmode={darkmode} title="Lost Items" subtitle="Items reported as lost around campus." type="lost" />

        {/* Grid of Lost Items */}
        <div className="flex-grow">
          <ItemGrid darkmode={darkmode} items={lostItemsData} />
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

export default LostItems;
