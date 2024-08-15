import React from "react";

const Cards = ({ item }) => {
  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-full max-w-xs bg-base-100 shadow-xl hover:scale-105 duration-200 ">
        <figure className="overflow-hidden w-full h-48">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex items-center justify-between">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions flex justify-between items-center mt-4">
            <div className="cursor-pointer px-2 py-1 rounded-lg border-2 border-gray-300">
              ₹{item.price}
            </div>
            <div className="cursor-pointer px-2 py-1 rounded-lg border-2 border-gray-300 hover:bg-purple-600 hover:text-white transition duration-200">
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
