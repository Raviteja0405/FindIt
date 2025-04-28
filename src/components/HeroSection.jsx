import React from "react";
import { Link } from "react-router-dom";

const HeroSection = ({ darkmode, title, subtitle, type}) => {
  return (
    <div
      className={`text-center my-3 px-4 py-8 ${darkmode ? 'bg-[#1A2330]' : 'bg-gray-50'}`}
    >
      <h1 className={`text-4xl font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h1>
      <p className={`text-lg mt-3 ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
        {subtitle}
      </p>

      <div className="mt-6 flex justify-center gap-4 flex-wrap">
        {(type === "lost" || type === "both") && (
          <Link to="/report-item?type=lost">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-semibold transition cursor-pointer">
              Report Lost Item
            </button>
          </Link> 
        )}
        {(type === "found" || type === "both") && (
          <Link to="/report-item?type=found">
            <button 
              className={`px-5 py-2 rounded-md font-semibold transition cursor-pointer ${darkmode ? 'bg-[#4A5568] text-white hover:bg-[#2D3748]' : 'bg-[#EDF2F7] text-gray-800 hover:bg-[#E2E8F0]'}`}
            >
              Report Found Item
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
