import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { authActions } from '../store/auth';
import { useDispatch } from "react-redux";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    const { email, password } = values;

    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/sign-in", values);
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

  // Inline styles
  const modalStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay
    zIndex: 1000,
  };

  const modalBoxStyles = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center',
    position: 'relative',
  };

  const closeButtonStyles = {
    position: 'absolute',
    right: '10px',
    top: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  };

  // Close modal function
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close(); // Close modal
    }
  };

  return (
    <div>
      <dialog ref={modalRef} id="login-modal" className="modal" style={modalStyles}>
        <div className="modal-box" style={modalBoxStyles}>
          {/* Close Button */}
          <button onClick={closeModal} style={closeButtonStyles}>
            ✕
          </button>

          <h3 className="font-bold text-lg">Login</h3>

          {/* Email */}
          <div className="mt-4 space-y-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4 space-y-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-around mt-6">
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
            >
              Login
            </button>
            <p>
              Not registered?{" "}
              <Link
                to="/sign-up"
                className="underline text-blue-500 cursor-pointer"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Login;