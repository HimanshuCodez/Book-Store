import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Cards";

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
          "http://localhost:4000/api/v1/get-favourites-books",
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
        "http://localhost:4000/api/v1/remove-from-favourite",
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
        setFavouriteBook((prev) =>
          prev.filter((book) => book._id !== bookId)
        );
      }
    } catch (error) {
      console.error("Error removing book from favourites:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mt-8 mb-8 text-center">
        Your Favourite Books
      </h1>
      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {favourites.map((item) => (
            <div key={item._id} className="flex flex-col items-center">
              <Cards data={item} favourite={true} /> {/* No Remove button here */}
              <button
                className="bg-red-500 text-white mt-4 px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleRemove(item._id)} // Remove button only here
              >
                Remove
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

export default Favourites;
