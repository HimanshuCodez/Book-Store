import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Conditional navigation items based on login status
  const navItems = isLoggedIn
    ? [
        <li key="home">
          <a href="/">Home</a>
        </li>,
        <li key="buy">
          <a href="/get-all-books">Buy Books</a>
        </li>,
        <li key="contact">
          <a>Contact</a>
        </li>,
        <li key="about">
          <a>About</a>
        </li>,
      ]
    : [
        <li key="home">
          <a href="/">Home</a>
        </li>,
        <li key="buy">
          <a href="/get-all-books">Buy Books</a>
        </li>,
      ];

  return (
    <>
      <div
        className={`max-w-screen-2xl font-bold container mx-auto md:px-20 px-4 dark:bg-slate-800 dark:text-white fixed top-0 left-0 right-0 z-50 ${
          sticky ? "sticky-navbar shadow-md bg-slate-100 duration-300" : ""
        }`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navItems}
              </ul>
            </div>
            <a className="text-2xl mx-50 font-bold cursor-pointer">Bookish</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            {/* Rest of your Navbar elements */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
