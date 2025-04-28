import React from "react";

const Footer = ({ darkmode }) => {
  return (
    <footer
      className={`flex items-center justify-center w-full h-10 mt-5 p-7 border-t ${
        darkmode ? "border-gray-700 text-gray-200" : "border-gray-200 text-gray-600"
      }`}
    >
      <div className="flex items-center justify-center">
        <p className="text-sm">
          Copyright &copy; 2025 FindIt. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
