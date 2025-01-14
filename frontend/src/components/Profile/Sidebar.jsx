import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ profile }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false); // Changed to false by default for mobile

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } top-0 left-0 h-full md:top-16 md:left-4 z-40`}
      >
        <div className="bg-gray-800 text-white p-6 h-full md:h-[calc(100vh-80px)] w-[280px] md:w-64 md:rounded-lg shadow-lg">
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-400 hover:text-white md:hidden"
          >
            <MdClose size={24} />
          </button>

          {/* User's Profile Section */}
          <div className="flex flex-col items-center mb-8 mt-8 md:mt-0">
            <img
              src={profile?.avatar || "/api/placeholder/100/100"}
              alt="User Profile"
              className="w-14 h-14 rounded-full border-2 border-white mb-4"
            />
            <h3 className="text-lg font-semibold">
              {profile?.username || "User"}
            </h3>
            <p className="text-xs text-gray-400">
              {profile?.email || "email@example.com"}
            </p>
          </div>

          {/* Sidebar Navigation Links */}
          <div className="mt-4 flex-grow">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/profile"
                  className="block p-3 rounded-md hover:bg-gray-700 transition-all duration-300 text-sm font-medium"
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                >
                  Favourites
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/orderHistory"
                  className="block p-3 rounded-md hover:bg-gray-700 transition-all duration-300 text-sm font-medium"
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/settings"
                  className="block p-3 rounded-md hover:bg-gray-700 transition-all duration-300 text-sm font-medium"
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Logout Button */}
          <div className="pt-4 border-t border-gray-700">
            <button
              className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-all duration-300 text-sm font-medium flex items-center justify-between"
              onClick={() => {
                dispatch(authActions.logout());
                dispatch(authActions.changeRole("user"));
                localStorage.clear("id");
                localStorage.clear("token");
                localStorage.clear("role");
                navigate("/")
              }}
            >
              Logout <TbLogout className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-20 left-4 bg-gray-800 text-white p-2 rounded-md shadow-lg hover:bg-gray-700 transition-all duration-300 md:hidden z-50 ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <FiMoreHorizontal size={24} />
      </button>
    </>
  );
};

export default Sidebar;
