import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    phone: false,
    whatsapp: false,
  });

  const navigate = useNavigate();

  const handleCheckboxChange = (type) => {
    setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSubmit = () => {
    // Placeholder for saving preferences without Firebase
    console.log("Saved preferences:", preferences);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Contact Preferences
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Choose how you'd like to be contacted when someone finds your item.
        </p>
        <div className="space-y-4">
          {["email", "phone", "whatsapp"].map((type) => (
            <label
              key={type}
              className="flex items-center space-x-3 text-gray-700"
            >
              <input
                type="checkbox"
                checked={preferences[type]}
                onChange={() => handleCheckboxChange(type)}
                className="accent-blue-600"
              />
              <span className="capitalize">{type}</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
