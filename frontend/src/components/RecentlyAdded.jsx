import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";
import Cards from "./Cards";
import Loader from "./Loader/Loader";
const  RecentlyAdded = ()=> {
  
  const [Data, setData] = useState();
  useEffect(() => {
    // Fetch data from API
    const fetch = async () => {
      const response = await axios.get(
        "https://backend-h759.onrender.com/api/v1/get-recent-books"
      );
     setData(response.data.data);
    };
    fetch();
  }, []);

  
  var settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop sliding
    speed: 500, // Slide transition speed (ms)
    slidesToShow: 5, // Number of cards to show at once
    slidesToScroll: 1, // Number of cards to scroll at once
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Top Selling Books</h1>
        </div>

        <div>
            {!Data && <div className=" flex items-center justify-center my-8"> <Loader/> </div>}
          <Slider {...settings}>
            {Data && Data.map((item,i) => (
              <div key={i}>
              
              <Cards  data={item} key={item.id} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
export default RecentlyAdded;
