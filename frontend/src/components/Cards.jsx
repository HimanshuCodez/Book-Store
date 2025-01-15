import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Cards = ({ data, favourite, setProfile }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleBookRemove = async () => {
    try {
      const response = await axios.put(
        "https://backend-h759.onrender.com/api/v1/remove-from-favourite",
        {},
        { headers }
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error removing book from favourites:", error);
    }
  };

  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

  return (
    <div className="p-2">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-800">
          {/* Image Container - Modified for better image display */}
          <div className="relative h-48 overflow-hidden rounded-t-lg bg-gray-100">
            <img
              src={data.url}
              alt={data.name}
              className="w-full h-full object-contain transform hover:scale-102 transition-transform duration-500"
              loading="lazy"
            />
            {/* Discount Tag */}
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg text-sm font-semibold">
              {data.discountPercent}% OFF
            </div>
          </div>

          {/* Content Section */}
          <div className="p-3">
            {/* Title */}
            <h2 className="text-base font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">
              {data.name}
            </h2>

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  className={index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">{rating}</span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-1">
              {data.description || "A fascinating book that takes readers on an incredible journey..."}
            </p>

            {/* Price Section */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  ₹{data.discountedPrice}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  ₹{data.price}
                </span>
              </div>
            </div>

            {/* Buy Button */}
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-1.5 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 text-sm font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
              Buy Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;