import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      const response = await axios.post("https://backend-h759.onrender.com/api/v1/sign-in", values);
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));

      if (response.data) {
        toast.success("Logged in Successfully");
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (err) {
      const errorMessage = err.response
        ? `Error: ${err.response.data.message}`
        : "Login failed. Please try again later.";
      console.error(err);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
      <div className="w-[600px]">
        <div id="login-modal" className="relative p-8 bg-white shadow-xl rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit}>
            {/* Close button */}
            <Link
              to="/"
              className="absolute right-2 top-2 text-gray-500 hover:text-red-500 text-2xl"
            >
              ✕
            </Link>

            <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">
              Login to Your Account
            </h3>

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

            {/* Submit Button */}
            <div className="flex justify-between items-center mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md px-6 py-2 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
              >
                Login
              </button>
              <p className="text-gray-700">
                New user?{" "}
                <Link to={"/sign-up"}>
                  <button className="underline text-blue-500 font-medium hover:text-blue-700 transition duration-200">
                    Signup
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

export default Login;
