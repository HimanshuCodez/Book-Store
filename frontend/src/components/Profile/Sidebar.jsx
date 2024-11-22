import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi"; // Import the three-dot icon

const Sidebar = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="bg-gray-800 text-white p-6 h-full w-full md:w-64 md:fixed md:left-0 top-0 flex flex-col shadow-lg z-50 md:h-screen md:pt-16 relative">
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-400 hover:text-white md:hidden z-60"
          >
            <MdClose size={24} />
          </button>

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
      )}

      {/* Open Sidebar Button - Three Dots */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-md shadow-lg hover:bg-gray-700 transition-all duration-300 md:hidden z-50"
        >
          <FiMoreHorizontal size={24} /> {/* Three-dot icon */}
        </button>
      )}
    </>
  );
};

export default Sidebar;
