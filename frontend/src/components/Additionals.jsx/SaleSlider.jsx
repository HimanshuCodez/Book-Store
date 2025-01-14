// SaleSlider.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SaleSlider = () => {
  const saleImages = [
    {
      id: 1,
      src: "https://www.bookswagon.com/bannerimages/85_inr.jpg?v=3.5",
      alt: "Winter Sale - Up to 50% Off",
    },
    {
      id: 2,
      src: "https://www.bookswagon.com/bannerimages/79_inr.jpg?v=3.5",
      alt: "Summer Reading Bonanza",
    },
    {
      id: 3,
      src: "https://www.bookswagon.com/bannerimages/81_inr.jpg?v=3.7",
      alt: "Buy 2 Get 1 Free!",
    },
    {
      id: 4,
      src: "https://www.bookswagon.com/bannerimages/70_inr.jpg?v=3.5",
      alt: "Buy 2 Get 1 Free!",
    },
    {
      id: 5,
      src: "https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2025/01/10/31615_BB_1_OnyxStorm_01_10_25.jpg",
      alt: "Buy 2 Get 1 Free!",
    },
  ];
  
  const settings = {
    dots: true, // Show pagination dots
    infinite: true, // Enable infinite loop
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay interval in ms
    arrows: true, // Show next/previous arrows
  };

  return (
    <div className="mt-6 max-w-screen-xl mx-auto px-4">
      <h2 className="text-center text-2xl font-bold mb-4">Current Offers</h2>
      <Slider {...settings} className="rounded-lg overflow-hidden shadow-lg">
        {saleImages.map((image) => (
          <div key={image.id} className="relative">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full  h-60 md:h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white text-center">
              <p className="text-lg">{image.alt}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SaleSlider;
