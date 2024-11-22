import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Profile/Sidebar";
import Loader from "./Loader/Loader";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/get-user-info", { headers });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (<>
      <Navbar />
    <div className="flex flex-col h-screen">
      {/* Navbar fixed at the top */}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        {!profile ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <Sidebar profile={profile} />
        )}

        {/* Profile Content with Outlet for nested routes */}
        <div className="flex-1  bg-gray-100 overflow-y-auto" style={{paddingLeft:"40vh"}}>
          <Outlet />
        </div>
      </div>

      {/* Footer fixed at the bottom */}
      
    </div>
    </>
  );
};

export default Profile;
