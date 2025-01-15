import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://backend-h759.onrender.com/api/v1/get-user-info", { headers });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 pt-16"> {/* Add pt-16 for navbar space */}
        {/* Sidebar */}
        <aside className="flex-shrink-0">
          {!profile ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <Sidebar profile={profile} />
          )}
        </aside>

        {/* Main content area with Outlet */}
        <main className="flex-1 overflow-auto bg-gray-100 min-h-[calc(100vh-4rem)]">
          <div className="container mx-auto px-4 py-8 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;