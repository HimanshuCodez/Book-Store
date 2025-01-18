import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { authActions } from "../store/auth";
 // Icon for user profile in case avatar is unavailable
import { TbLogout } from "react-icons/tb";



const Navbar = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const element = document.documentElement;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user); // Assuming `user` has profile info like avatar
  const location = useLocation();
   const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const debounceTimeout = useRef(null);
  
    const fetchSearchResults = async (searchQuery) => {
      if (!searchQuery?.trim()) {
        setResults([]);
        return;
      }
  
      setLoading(true);
      setError(null);
      
      try {
       
        const response = await fetch(`https://backend-h759.onrender.com/api/v1/search?q=${encodeURIComponent(searchQuery.trim())}`);
        
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error: ${response.status}`);
          } else {
            throw new Error(`Server error: ${response.status}`);
          }
        }
        
        const data = await response.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError(error.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setQuery(value);
  
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
  
      if (value.trim() !== "") {
        debounceTimeout.current = setTimeout(() => {
          fetchSearchResults(value);
        }, 300);
      } else {
        setResults([]);
      }
    };
  
    useEffect(() => {
      return () => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
      };
    }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`max-w-screen-2xl font-bold  container mx-auto md:px-12 mt-1 px-4 dark:bg-slate-800 dark:text-white fixed top-0 left-0 right-0 z-50 ${
        sticky ? "sticky-navbar shadow-md bg-slate-100 duration-300" : ""
      }`}
    >
      
      <div className="navbar  mt-2">
      
        <div className="navbar-start">
          <Link to="/" className="text-2xl   font-bold cursor-pointer">
            Bookish
          </Link>
        </div>
       {/* Search Bar Component */}
   <div className="relative w-full lg:w-[23%]">
         <input
           type="text"
           placeholder="Search books..."
           className="input  input-bordered w-full rounded-md px-4 py-2"
           value={query}
           onChange={handleInputChange}
         />
   
         <div className="absolute top-3 right-4">
           {loading ? (
             <div className="animate-spin  rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-400" />
           ) : (
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-5 h-5 text-gray-400"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M21 21l-4.35-4.35m1.68-5.52a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
               />
             </svg>
           )}
         </div>
   
         {query && (
           <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-y-auto z-50">
             {loading && (
               <div className="p-4 text-center text-gray-500">
                 <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mx-auto mb-2" />
                 <p>Searching...</p>
               </div>
             )}
             
             {error && (
               <div className="p-4 text-center text-red-500">
                 <p>{error}</p>
               </div>
             )}
             
             {!loading && !error && results.length === 0 && query && (
               <div className="p-4 text-center text-gray-500">
                 <p>No books found</p>
               </div>
             )}
   
             {!loading && !error && results.map((book) => (
               <Link
                 to={`/books/${book._id}`}
                 key={book._id || book.id}
                 className="block px-4 py-2 hover:bg-gray-100"
               >
                 <div className="flex items-center space-x-4">
                   <div className="w-12 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                     {book.url ? (
                       <img
                         src={book.url}
                         alt={book.name}
                         className="w-full h-full object-cover"
                         onError={(e) => {
                           e.target.onerror = null;
                           e.target.src = "/placeholder-book.png";
                         }}
                       />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center">
                         <svg
                           className="w-6 h-6 text-gray-400"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth={2}
                             d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                           />
                         </svg>
                       </div>
                     )}
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="font-semibold text-sm truncate">{book.name}</p>
                     <p className="text-gray-500 text-sm truncate">{book.author}</p>
                     {book.language && (
                       <p className="text-gray-400 text-xs">{book.language}</p>
                     )}
                     {book.price && (
                       <p className="text-red-500 font-semibold text-sm">
                         ₹{typeof book.price === 'number' ? book.price.toFixed(2) : book.price}
                       </p>
                     )}
                   </div>
                 </div>
               </Link>
             ))}
           </div>
         )}
       </div>
    
        {/* Desktop Navigation */}
        <div className="navbar-end space-x-3">
       
          <ul className="menu menu-horizontal hidden lg:flex px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/get-all-books">All Books</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            )}
          </ul>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />

            {/* Sun icon for Light Mode */}
            <svg
              className="swap-off h-8 w-8 fill-current text-black-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon for Dark Mode */}
            <svg
              className="swap-on h-8 w-8 fill-current text-white-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          {/* Conditional Rendering for Profile Dropdown or Login/Signup */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none"
              >
                <img
                  src={
                    "https://imgs.search.brave.com/3L58XVCErl9Jwact_9hf94wgnvkan16Acz9ugZpCIj0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbmdz/ZXQuY29tL2ltYWdl/cy9pbWFnZS1vZi1w/cmluY2Vzcy1idWJi/bGVndW0tcHJvZmls/ZS1wcmVzYWxlLXB1/cnBsZS1sZWlzdXJl/LWFjdGl2aXRpZXMt/YmFkbWludG9uLXN0/b21hY2gtdHJhbnNw/YXJlbnQtcG5nLTY0/NTE2OS5wbmc" ||
                    "/default-avatar.jpg"
                  }
                  alt="Profile"
                  className=" mt-2 w-11 h-11 rounded-full border-2 border-white object-cover" // Increase width and height here
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                  <ul className="py-1 text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Cart
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/profile/orderHistory"
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/settings"
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        className="w-full text-red-600 hover:bg-gray-200  dark:hover:bg-gray-700 p-3 rounded-md  transition-all duration-300  font-medium flex items-center justify-between"
                        onClick={() => {
                          dispatch(authActions.logout());
                          dispatch(authActions.changeRole("user"));
                          localStorage.clear("id");
                          localStorage.clear("token");
                          localStorage.clear("role");
                          navigate("/");
                        }}
                      >
                        Logout <TbLogout className="ml-2" />
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link to={"/sign-in"}>
                <button className="bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800 duration-300">
                  Login
                </button>
              </Link>
              <Link
                to={"/sign-up"}
                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 duration-300"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    
    </div>
  );
};

export default Navbar;
