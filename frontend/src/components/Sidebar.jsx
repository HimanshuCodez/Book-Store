import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ profile }) => {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 flex flex-col">
      {/* User's Profile Section */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={profile.avatar || "/path/to/default/avatar.jpg"} // Default avatar if no picture exists
          alt="User Profile"
          className="w-16 h-16 rounded-full border-2 border-white"
        />
        <div>
          <h3 className="text-xl font-semibold">{profile.username}</h3>
          <p className="text-sm">{profile.email}</p>
        </div>
      </div>

      {/* Sidebar Navigation Links */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Profile</h3>
        <ul className="space-y-3">
          <li>
            <Link
              to="/profile"
              className="block p-3 rounded-md hover:bg-gray-700 transition-all duration-300"
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              to="/profile/settings"
              className="block p-3 rounded-md hover:bg-gray-700 transition-all duration-300"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/profile/orders"
              className="block p-3 rounded-md hover:bg-gray-700 transition-all duration-300"
            >
              Orders
            </Link>
          </li>
        </ul>
      </div>

      {/* Optional logout section */}
      <div className="mt-auto ">
        <button
          className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
