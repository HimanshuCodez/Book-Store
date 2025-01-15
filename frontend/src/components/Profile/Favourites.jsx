import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Cards";
import { FiTrash2 } from "react-icons/fi";

const Favourites = () => {
  const [favourites, setFavouriteBook] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch favourites
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "https://backend-h759.onrender.com/api/v1/get-favourites-books",
          { headers }
        );
        setFavouriteBook(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };

    fetchFavourites();
  }, []);

  // Remove book from favourites
  const handleRemove = async (bookId) => {
    try {
      const response = await axios.put(
        "https://backend-h759.onrender.com/api/v1/remove-from-favourite",
        {},
        {
          headers: {
            ...headers,
            bookid: bookId,
          },
        }
      );

      if (response.status === 200) {
        // Update state to remove the book
        setFavouriteBook((prev) => prev.filter((book) => book._id !== bookId));
      }
    } catch (error) {
      console.error("Error removing book from favourites:", error);
    }
  };

  return (
    <div className="p-8  min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800  mb-8 text-center">
        Your Favourite Books
      </h1>
      {favourites.length > 0 ? (
        <div className="grid    lg:pl-44 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {favourites.map((item) => (
            <div
              key={item._id}
              className="flex   flex-col items-center"
            >
              <Cards data={item} favourite={true} />{" "}
              {/* No Remove button here */}
              <button
                onClick={() => handleRemove(item._id)}
                className="inline-flex -mt-7 items-center text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <FiTrash2 className="w-5 h-5 mr-2" />
                <span>Remove</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg text-center mt-12">
          No favourite books found.
        </p>
      )}
    </div>
  );
};
<button
  onClick={() => handleRemove(item._id)}
  className="inline-flex items-center text-red-500 hover:text-red-700 transition-colors duration-200"
>
  <FiTrash2 className="w-5 h-5 mr-2" />
  <span>Remove</span>
</button>;
export default Favourites;
