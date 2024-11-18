import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast"; // For showing success/error messages

const BookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    // Fetch data from API
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/v1/add-to-favourite",
        { },
        { headers }
      );
      console.log("Favourite added:", response.data); // For debugging
      toast.success("Book added to your favourites!");
    } catch (error) {
      toast.error("Already in Favourites.");
    }
  };
  const handleCart = async () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
  
    // Validate required data
    if (!userId || !token || !id) {
      return toast.error("Required data is missing. Please try again.");
    }
  
    const headers = {
      id: userId,
      authorization: `Bearer ${token}`,
      bookid: id, // `id` comes from `useParams`
    };
  
    try {
      const response = await axios.put(
        "http://localhost:4000/api/v1/add-to-cart",
        {}, // Empty body; headers contain necessary data
        { headers }
      );
      console.log("Book added in cart:", response.data); // For debugging
      toast.success("Book added to your cart!");
    } catch (error) {
      console.error("Error adding book to cart:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred. Try again.");
    }
  };
  

  return (
    <>
      {Data ? (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
          {/* Book Image Section */}
          <div className="relative bg-zinc-700 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center">
            <img
              className="h-[50vh] lg:h-[70vh] rounded"
              src={Data.url}
              alt={Data.title || "Book Cover"}
            />
            {isLoggedIn === true && role === "user" && (
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                  className="bg-white text-red-600 rounded-full text-2xl p-2 shadow-md"
                  onClick={handleFavourite}
                >
                  <FaHeart />
                </button>
                <button className="bg-white text-blue-600 rounded-full text-2xl p-2 shadow-md"  onClick={handleCart}>
                  <FaCartPlus />
                </button>
              </div>
            )}
            {isLoggedIn === true && role === "admin" && (
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                  className="bg-white text-red-600 rounded-full text-2xl p-2 shadow-md"
                  onClick={handleFavourite}
                >
                  <FaEdit />
                </button>
                <button className="bg-white text-blue-600 rounded-full text-2xl p-2 shadow-md" onClick={handleCart}>
                  <MdDeleteOutline />
                </button>
              </div>
            )}
          </div>

          {/* Book Details Section */}
          <div className="p-4 w-full lg:w-3/6 space-y-4">
            <p className="font-semibold text-2xl text-zinc-100">{Data.title}</p>
            <p className="font-semibold text-lg text-zinc-400">by {Data.author}</p>
            <p className="text-sm text-zinc-300 mt-4">{Data.description}</p>
            <p className="text-sm text-zinc-400 mt-2">Language: {Data.language}</p>
            <p className="font-semibold text-xl text-zinc-100 mt-4">Price: ₹{Data.price}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
    </>
  );
};

export default BookDetails;
