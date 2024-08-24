import React from "react";

const Cards = ({ item }) => {
  return (
    <div className="mt-4 my-8 p-3">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border ">
        <figure className="3 w-full h-48">
          <img
            src={item.image}
            alt={item.name}
            className=" h-full object-fill"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between ">
            <div className="badge badge-outline">
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
