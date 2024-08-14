import React from "react";

const Cards = ({ item }) => {
  

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 w-100 shadow-xl ">
          <figure>
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
            {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions  justify-between">
              <div className="cursor-pointer px-2 py-1 rounded-lg border-[2px]">₹{item.price}</div>
              {/* <div className="badge badge-outline">Products</div> */}
              <div className="cursor-pointer px-2 py-1 rounded-lg border-[2px] hover:bg-purple-600  hover:text-white duration-200">Add to cart</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
