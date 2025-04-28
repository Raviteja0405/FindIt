import React from "react";
import { Search } from "lucide-react";

const SearchFilter = ({ darkmode }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 my-5">
      {/* Search Box */}
      <div
        className={`flex items-center px-3 py-2 rounded-md w-full sm:max-w-lg ${
          darkmode ? "bg-[#1a2330] border border-gray-600" : "bg-gray-100 border border-gray-300"
        }`}
      >
        <Search
          className={`${darkmode ? "text-gray-300" : "text-gray-500"} transition-colors duration-200`}
          size={20}
        />
        <input
          type="text"
          placeholder="Search items..."
          className={`ml-2 outline-none w-full rounded-md ${
            darkmode
              ? "bg-[#1a2330] text-gray-200 placeholder-gray-400"
              : "bg-gray-100 text-gray-700 placeholder-gray-500"
          }`}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
        <select
          className={`w-full sm:w-auto ${
            darkmode
              ? "bg-[#1a2330] text-gray-200 border border-gray-600"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          } p-2 rounded-md`}
        >
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Books</option>
          <option>Clothing</option>
          <option>Accessories</option>
        </select>

        <select
          className={`w-full sm:w-auto ${
            darkmode
              ? "bg-[#1a2330] text-gray-200 border border-gray-600"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          } p-2 rounded-md`}
        >
          <option>All Status</option>
          <option>Lost</option>
          <option>Found</option>
        </select>

        <select
          className={`w-full sm:w-auto ${
            darkmode
              ? "bg-[#1a2330] text-gray-200 border border-gray-600"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          } p-2 rounded-md`}
        >
          <option>Date (Newest)</option>
          <option>Date (Oldest)</option>
        </select>

      </div>
    </div>
  );
};

export default SearchFilter;
