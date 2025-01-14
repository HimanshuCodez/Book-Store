import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GifReviewSlider = () => {
  const gifReviews = [
    {
      id: 1,
      src: "https://media.tenor.com/3F-4LIKETVkAAAAM/dynataee-dynatae.gif",
      alt: "Amazing Service - Customer Review 1",
      caption: "Amazing Service! Highly Recommend.",
    },
    {
      id: 2,
      src: "https://media.tenor.com/tntw8mhrvJkAAAAM/study-student.gif",
      alt: "Fast Delivery - Customer Review 2",
      caption: "Fast delivery! Impressed with the speed.",
    },
    {
      id: 3,
      src: "https://media.tenor.com/_V8TTKAXYB0AAAAM/spongebob-squarepants-sunglasses.gif",
      alt: "Great Quality - Customer Review 3",
      caption: "Great quality books! Will shop again.",
    },
    {
      id: 4,
      src: "https://media1.tenor.com/m/amkvR7wAEpMAAAAd/nice-good.gif",
      alt: "Loved the Experience - Customer Review 4",
      caption: "Loved the shopping experience!",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Display 4 GIFs at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For small mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Customer Reviews
      </h2>
      <Slider {...settings}>
        {gifReviews.map((review) => (
          <div key={review.id} className="px-2">
            <img
              src={review.src}
              alt={review.alt}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="mt-4 text-center font-semibold text-gray-700 dark:text-gray-300">
              {review.caption}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GifReviewSlider;
