import React from "react";

const ItemCard = ({ status, title, description, location, date, image, darkmode }) => {
  return (
    <div
      className={`${
        darkmode ? "bg-[#364358]" : "bg-white"
      } shadow-lg rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105`}
    >
      {/* Image Display */}
      <div
        className={`${
          darkmode ? "bg-gray-600" : "bg-gray-200"
        } h-50 rounded-md mb-4 bg-cover bg-center`}
        style={{
          backgroundImage: image ? `url(${image})` : "none",
        }}
      >
        {!image && (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {/* Status */}
        <span
          className={`${
            darkmode ? "text-teal-400" : "text-teal-600"
          } text-sm font-medium`}
        >
          {status}
        </span>

        {/* Title */}
        <h3
          className={`${
            darkmode ? "text-gray-100" : "text-gray-900"
          } text-xl font-semibold`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`${
            darkmode ? "text-gray-400" : "text-gray-700"
          } text-sm`}
        >
          {description}
        </p>

        {/* Location and Date */}
        <div className="flex justify-between text-sm mt-2">
          <p
            className={`${
              darkmode ? "text-gray-500" : "text-gray-600"
            }`}
          >
            {location}
          </p>
          <p
            className={`${
              darkmode ? "text-gray-500" : "text-gray-600"
            }`}
          >
            {date}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          {/* Contact Button */}
          <button
            className={`${
              darkmode ? "text-blue-400" : "text-blue-600"
            } hover:text-blue-500 text-sm font-semibold transition duration-200 ease-in-out hover:underline`}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
