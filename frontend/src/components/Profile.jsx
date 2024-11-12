import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import Sidebar component
import Loader from "./Loader/Loader";

const Profile = () => {
  const [profile, setProfile] = useState(null); // User profile state
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch user data from API using useEffect
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/get-user-info", { headers });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      {!profile ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader /> {/* Show loader while data is being fetched */}
        </div>
      ) : (
        <Sidebar profile={profile} /> // Pass profile data to Sidebar
      )}

      {/* Profile Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Outlet for child routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
