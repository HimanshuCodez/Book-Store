import React from "react";
import Slider from "react-slick";

// Fake author data
const authors = [
  {
    id: 1,
    name: "Sashi Tharoor",
    avatar: "https://d2g9wbak88g7ch.cloudfront.net/authorimages/dr-shashi-tharoor-2.jpg",
    books: 25,
  },
  {
    id: 2,
    name: "George Orwell",
    avatar: "https://d2g9wbak88g7ch.cloudfront.net/authorimages/william-wordsworth-8.jpg",
    books: 12,
  },
  {
    id: 3,
    name: "Virginia Woolf",
    avatar: "https://d2g9wbak88g7ch.cloudfront.net/authorimages/dillian.jpg",
    books: 18,
  },
  {
    id: 4,
    name: "Ernest Hemingway",
    avatar: "https://d2g9wbak88g7ch.cloudfront.net/authorimages/arundhatistory_647_100316054702.jpg",
    books: 22,
  },
  {
    id: 5,
    name: "Mark Twain",
    avatar: "https://via.placeholder.com/150/000000/FFFFFF?text=MT",
    books: 30,
  },
  {
    id: 6,
    name: "Leo Tolstoy",
    avatar: "https://via.placeholder.com/150/800080/FFFFFF?text=LT",
    books: 35,
  },
];

// Slider settings
const sliderSettings = {
  
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipe: true,
  swipeToSlide: true, // Allows users to swipe through slides
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const AuthorSlider = () => {
  return (
    <div className="p-8 justify-center items-center bg-gray-50 dark:bg-slate-800 dark:text-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Featured Authors
      </h2>
      <Slider {...sliderSettings}>
        {authors.map((author) => (
          <div
            key={author.id}
            className="flex   lg:ml-14 pl-24 flex-col items-center  dark:bg-slate-700 shadow-md rounded-lg p-4 space-y-4"
          >
            <img
              src={author.avatar}
              alt={author.name}
              className="w-24 h-24 ml-7 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold">{author.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Books Published: {author.books}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AuthorSlider;
