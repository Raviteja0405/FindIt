import React from "react";

const HeroSection = ({ darkmode }) => {
  return (
    <div
      className={`text-center my-10 px-4 py-8 ${darkmode ? 'bg-[#1A2330]' : 'bg-white'}`}
    >
      <h1 className={`text-4xl font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
        FindIt: Campus Lost & Found Portal
      </h1>
      <p className={`text-lg mt-4 ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
        Reconnect with your lost items or help others find theirs
      </p>

      <div className="mt-6 flex justify-center gap-4 flex-wrap">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-semibold transition">
          Report Lost Item
        </button>
        <button 
          className={`px-5 py-2 rounded-md font-semibold transition ${darkmode ? 'bg-[#4A5568] text-white hover:bg-[#2D3748]' : 'bg-[#EDF2F7] text-gray-800 hover:bg-[#E2E8F0]'}`}
        >
          Report Found Item
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
