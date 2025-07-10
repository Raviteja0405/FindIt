import React from "react";

const ItemCard = ({
  type,
  title,
  description,
  location,
  date,
  image,
  category,
  darkmode,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`${
        darkmode ? "bg-[#364358] text-white" : "bg-white text-black"
      } shadow-lg rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105`}
    >
      {/* Image Display */}
      <div
        className={`${
          darkmode ? "bg-gray-600" : "bg-gray-200"
        } h-48 rounded-md bg-cover bg-center`}
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

      {/* Content */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span
            className={`inline-block px-3 py-1 text-xs rounded-full font-medium w-fit 
              ${
                darkmode
                  ? (type === "Lost" ? "bg-red-700 text-red-100" : "bg-green-700 text-green-100")
                  : (type === "Lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800")
              }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>

          <span
            className={`inline-block px-3 py-1 text-xs rounded-full font-medium w-fit 
              ${
                darkmode
                  ? "bg-teal-700 text-white"
                  : "bg-teal-100 text-teal-800"
              }`}
          >
            {category}
          </span>
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>

        <p className="text-sm">{description}</p>

        <div className="flex justify-between text-sm opacity-70 mt-2">
          <p>{location}</p>
          <p>{date}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <button
            className={`text-sm font-semibold hover:underline transition ${
              darkmode
                ? "text-blue-300 hover:text-blue-400"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            Contact
          </button>

          {(onEdit || onDelete) && (
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="text-sm px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
