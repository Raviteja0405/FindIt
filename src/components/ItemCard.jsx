import React from "react";

const ItemCard = ({ status, title, description, user, darkmode, image }) => {
  return (
    <div
      className={`${
        darkmode ? "bg-[#1a2330]" : "bg-white"
      } shadow-lg rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out hover:shadow-xl`}
    >
      {/* Image Display */}
      <div
        className={`${
          darkmode ? "bg-gray-700" : "bg-gray-200"
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
            darkmode ? "text-blue-400" : "text-blue-600"
          } text-sm font-medium`}
        >
          {status}
        </span>

        {/* Title */}
        <h3
          className={`${
            darkmode ? "text-gray-100" : "text-gray-800"
          } text-xl font-semibold`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`${
            darkmode ? "text-gray-400" : "text-gray-600"
          } text-sm`}
        >
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          {/* User */}
          <span
            className={`${
              darkmode ? "text-gray-400" : "text-gray-500"
            } text-sm`}
          >
            {user}
          </span>

          {/* Contact Button */}
          <button
            className={`${
              darkmode ? "text-blue-400" : "text-blue-600"
            } hover:underline text-sm transition duration-200 ease-in-out hover:text-blue-500`}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
