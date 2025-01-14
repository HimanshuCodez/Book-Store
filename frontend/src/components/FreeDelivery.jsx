import React from "react";
import Slider from "react-slick";

const messages = [
  "Free delivery above 500rs!",
  "Shop now and save more!",
  "Exciting offers available today!",
];

const sliderSettings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false, 
  dots: false,   
};

const FreeDeliveryBanner = () => {
  return (
    <div className="bg-purple-600 text-white text-center h-5 sticky top-0 z-50">
      <Slider {...sliderSettings}>
        {messages.map((message, index) => (
          <div key={index}>
            <p className="  font-semibold">{message}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FreeDeliveryBanner;
