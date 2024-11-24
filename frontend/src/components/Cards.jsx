import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cards = ({ data, favourite, setProfile }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleBookRemove = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/v1/remove-from-favourite",
        {},
        { headers }
      );
      setProfile(response.data); // Update the profile state after removing the book
    } catch (error) {
      console.error("Error removing book from favourites:", error);
    }
  };

  return (
    <div className="mt-4 my-8 p-3">
      {/* Book Details (Link to view details) */}
      <Link to={`/view-book-details/${data._id}`}>
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure className="3 w-full h-48">
            <img
              src={data.url}
              alt={data.name}
              className="h-full object-fill"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {data.name}
              <p className="text-green-600 font-semibold">
                {data.discountPercent}% off
              </p>
            </h2>
            <p>{data.title}</p>
            <div className="card-actions justify-between">
              <p className="font-extrabold">₹{data.discountedPrice}</p>
              <p className="line-through opacity-50">₹{data.price}</p>
              <div className="cursor-pointer px-2 py-1 rounded-lg border-2 border-gray-300 hover:bg-purple-600 hover:text-white transition duration-200">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </Link>

    
    </div>
  );
};

export default Cards;
