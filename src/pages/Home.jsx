import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchFilter from "../components/SearchFilter";
import ItemGrid from "../components/ItemGrid";
import Footer from "../components/Footer";

const Home = ({ darkmode, setDarkmode }) => {
  return (
    <div
      className={`${
        darkmode ? "bg-[#1a2330]" : "bg-gray-50"
      } min-h-screen transition-colors duration-300`}
    >
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />
      <div className="px-8 py-6 max-w-7xl mx-auto">
        <HeroSection darkmode={darkmode} />
        <SearchFilter darkmode={darkmode} />
        <ItemGrid darkmode={darkmode} />
        <div className="flex justify-center my-10">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-semibold transition">
            Load More Items
          </button>
        </div>
      </div>
      <Footer darkmode={darkmode} />
    </div>
  );
};

export default Home;
