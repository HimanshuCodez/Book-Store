import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Cards";

const Favourites = () => {
  const [favourites, setFavouriteBook] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
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

    fetch();
  }, [favourites]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mt-8 mb-8 text-center">
        Your Favourite Books
      </h1>
      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {favourites.map((item, i) => (
            <div key={i} className="flex justify-center">
              {/* Apply fixed card dimensions */}
              <div className="">
                <Cards data={item} favourite={true} />
              </div>
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
