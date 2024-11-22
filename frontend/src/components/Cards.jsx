import React from "react";
import { Link } from "react-router-dom";
const Cards = ({ data, favourite }) => {
  return (
    <>
      <Link to={`/view-book-details/${data._id}`}>
        <div className="mt-4 my-8 p-3">
          <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border ">
            <figure className="3 w-full h-48">
              <img
                src={data.url}
                alt={data.name}
                className=" h-full object-fill"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title ">
                {data.name}

                <p className=" text-green-600 font-semibold">
                  {data.discountPercent}%off
                </p>
              </h2>
              <p>{data.title}</p>
              <div className="card-actions justify-between ">
                <p className=" font-extrabold ">₹{data.discountedPrice}</p>
                <p className=" line-through opacity-50">₹{data.price}</p>

                <div className="cursor-pointer px-2 py-1 rounded-lg border-2 border-gray-300 hover:bg-purple-600 hover:text-white transition duration-200">
                  Buy Now
                </div>
              </div>
            </div>
     {favourite && ( <button
        className="bg-yellow-50 mt-4 font-semibold px-4 py-2 rounded border border-yellow-500 text-yellow-500"
      
      >
        Remove from Favourites
      </button>)}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Cards;
