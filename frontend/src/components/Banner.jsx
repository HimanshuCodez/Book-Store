import React from "react";
import file from "../../public/file.png";
import FreeDeliveryBanner from "./Additionals.jsx/FreeDelivery";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <>
      <div className=" flex flex-col ">
        <FreeDeliveryBanner />
        <div className=" pt-12 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
          <div className="w-full order-2  md:order-1  md:w-1/2 mt:12 md:mt-36">
            <div className="space-y-9">
              {" "}
              <h1 className="text-4xl  md:text-4xl font-bold">
                Hello,Welcome here to learn something{" "}
                <span className="text-purple-600"> new everyday!! </span>
              </h1>
              <p className="text-xl md:text-xl ">
              Here you'll discover a curated selection of books catering to all your interests! Dive into the captivating world of manga, indulge in the magic of K-drama-inspired novels, and explore a variety of genres that ignite your imagination. Whether you're a fan of graphic storytelling or looking for gripping dramas, our store offers something for everyone. Let your reading journey begin here!








              </p>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email" />
              </label>
            </div>
            <Link to={"/bookRequest"}>
            <button className="btn mt-6 bg-purple-500 text-white hover:text-black ">
              Request Book
            </button>
            </Link>
          </div>
          <div className=" order-1 w-full md:w-1/2">
            <img src={file} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
