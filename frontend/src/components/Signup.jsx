import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Login from "./Login"; // Ensure Login is handled separately

function Signup() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const { username, email, password, address } = values;
    if (!username || !email || !password || !address) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/sign-up", values);
      if (response.data) {
        toast.success("Signup Successful");
        navigate("/sign-in");
      }
    } catch (err) {
      const errorMessage = err.response
        ? `Error: ${err.response.data.message}`
        : "Signup failed. Please try again later.";
      console.error(err);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[600px]">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Signup</h3>

            {/* Name Input */}
            <div className="mt-4 space-y-2">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your fullname"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                value={values.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="mt-4 space-y-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mt-4 space-y-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                value={values.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address Input */}
            <div className="mt-4 space-y-2">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                value={values.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-around mt-4">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Signup
              </button>
              <p className="text-xl">
                Have an account?{" "}
                <Link
                  to="/sign-in"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Login Modal */}
      
    </div>
  );
}

export default Signup;
