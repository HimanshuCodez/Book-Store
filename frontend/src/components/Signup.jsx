import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Login from './Login'; // Import the Login component

function Signup() {
  // State to hold form values
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructure form values for easy validation
    const { username, email, password, address } = values;

    // Check for empty fields and show a toast error
    if (!username || !email || !password || !address) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // Send the signup data to the backend
      const response = await axios.post("https://backend-h759.onrender.com/api/v1/sign-up", values);

      if (response.data) {
        toast.success("Signup Successful");
        navigate("/sign-in"); // Redirect to login page after signup
      }
    } catch (err) {
      
      toast.error("User Already Exixts");
    }
  };
  return (
    <div className="dark:bg-slate-900 dark:text-white flex h-screen items-center justify-center bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
    <div className="w-[600px]">
      <div id="signup-modal" className="relative p-8 bg-white shadow-xl rounded-lg border border-gray-200">
        <form onSubmit={handleSubmit}>
          {/* Close button */}
          <Link
            to="/"
            className="absolute right-2 top-2 text-gray-500 hover:text-red-500 text-2xl"
          >
            ✕
          </Link>
  
          <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Create Your Account
          </h3>
  
          {/* Name Input */}
          <div className="mt-4 space-y-2">
            <label htmlFor="username" className="block text-gray-600 font-medium">
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={values.username}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Email Input */}
          <div className="mt-4 space-y-2">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Password Input */}
          <div className="mt-4 space-y-2">
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Address Input */}
          <div className="mt-4 space-y-2">
            <label htmlFor="address" className="block text-gray-600 font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={values.address}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Submit Button */}
          <div className="flex justify-between items-center mt-8">
            <button
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md px-6 py-2 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
            >
              Signup
            </button>
            <p className="text-gray-700">
              Have an account?{" "}
              <Link to={"/sign-in"}>
                <button className="underline text-blue-500 font-medium hover:text-blue-700 transition duration-200">
                  Login
                </button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
}

export default Signup;
