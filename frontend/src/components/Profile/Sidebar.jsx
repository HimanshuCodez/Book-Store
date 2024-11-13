import React from "react";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";

const Sidebar = ({ profile }) => {
  return (
    <div className="bg-gray-800 text-white p-6 h-full md:w-64 w-full md:fixed md:left-0 top-0 flex flex-col shadow-lg z-50 md:h-screen md:pt-16">
      {/* User's Profile Section */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={profile.avatar || "/path/to/default/avatar.jpg"}
          alt="User Profile"
          className="w-14 h-14 rounded-full border-2 border-white"
        />
        <div>
          <h3 className="text-lg mt-1 font-semibold">{profile.username}</h3>
          <p className="text-xs text-gray-400">{profile.email}</p>
        </div>
      </div>

      {/* Sidebar Navigation Links */}
      <div className="mt-4 flex-grow">
        <ul className="space-y-3">
          <li>
            <Link
              to="/profile"
              className="block p-3 rounded-md hover:bg-gray-700 transition-all duration-300 text-sm font-medium"
            >
              Favourites
            </Link>
          </li>
          <li>
            <Link
              to="/profile/orderHistory"
              className="block p-3 rounded-md hover:bg-gray-700 transition-all duration-300 text-sm font-medium"
            >
              Order History
            </Link>
          </li>
          <li>
            <Link
              to="/profile/settings"
              className="block p-3 rounded-md hover:bg-gray-700 transition-all duration-300 text-sm font-medium"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="pt-4 border-t border-gray-700">
        <button className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-all duration-300 text-sm font-medium flex items-center justify-between">
          Logout <TbLogout className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
