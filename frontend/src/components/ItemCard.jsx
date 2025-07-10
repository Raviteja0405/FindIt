import { useState } from "react";

const ItemCard = ({
  type,
  title,
  description,
  location,
  date,
  image,
  category,
  darkmode,
  contactInfo,
  onEdit,
  onDelete,
}) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div
      className={`${
        darkmode ? "bg-[#364358] text-white" : "bg-white text-black"
      } shadow-lg rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-103`}
    >
      {/* Image */}
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

      {/* Details */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span
            className={`inline-block px-3 py-1 text-xs rounded-full font-medium w-fit ${
              darkmode
                ? type === "Lost"
                  ? "bg-red-700 text-red-100"
                  : "bg-green-700 text-green-100"
                : type === "Lost"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>

          <span
            className={`inline-block px-3 py-1 text-xs rounded-full font-medium w-fit ${
              darkmode ? "bg-teal-700 text-white" : "bg-teal-100 text-teal-800"
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

        {/* Footer Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setShowContact(!showContact)}
            className={`text-sm font-semibold hover:underline transition ${
              darkmode
                ? "text-blue-300 hover:text-blue-400"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            {showContact ? "Hide Contact" : "Contact"}
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

        {/* Contact Info */}
        {showContact && contactInfo && (
          <div
            className={`mt-3 p-3 rounded-md border ${
              darkmode
                ? "border-gray-600 bg-[#2a3b57] text-gray-200"
                : "border-gray-300 bg-gray-100 text-gray-800"
            }`}
          >
            <p>
              <strong>Email:</strong> {contactInfo.email}
            </p>
            {contactInfo.phone && (
              <p>
                <strong>Phone:</strong> {contactInfo.phone}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
