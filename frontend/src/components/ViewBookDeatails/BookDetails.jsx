import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { FaHeart, FaCartPlus } from "react-icons/fa";

const BookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);

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
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button className="bg-white text-red-600 rounded-full text-2xl p-2 shadow-md">
                <FaHeart />
              </button>
              <button className="bg-white text-blue-600 rounded-full text-2xl p-2 shadow-md">
                <FaCartPlus />
              </button>
            </div>
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
