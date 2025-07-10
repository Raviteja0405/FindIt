import React from "react";
import { Search } from "lucide-react";

const SearchFilter = ({ darkmode, filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

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
          name="query"
          value={filters.query}
          onChange={handleChange}
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
          name="category"
          value={filters.category}
          onChange={handleChange}
          className={`w-full sm:w-auto ${
            darkmode
              ? "bg-[#1a2330] text-gray-200 border border-gray-600"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          } p-2 rounded-md`}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
          <option value="Bags & Containers">Bags & Containers</option>
          <option value="Documents & Papers">Documents & Papers</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className={`w-full sm:w-auto ${
            darkmode
              ? "bg-[#1a2330] text-gray-200 border border-gray-600"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          } p-2 rounded-md`}
        >
          <option value="">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className={`w-full sm:w-auto ${
            darkmode
              ? "bg-[#1a2330] text-gray-200 border border-gray-600"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          } p-2 rounded-md`}
        >
          <option value="newest">Date (Newest)</option>
          <option value="oldest">Date (Oldest)</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
