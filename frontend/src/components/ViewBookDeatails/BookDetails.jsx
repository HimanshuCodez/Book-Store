import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { FaHeart, FaCartPlus, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import RelatedBooks from "./RelatedBooks";
import Navbar from "../Navbar";

const BookDetails = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: "", rating: 0 });
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/v1/get-book-by-id/${id}`
        );
        setBookData(response.data.data);

        // Fake reviews for testing with avatars
        const fakeReviews = [
          {
            text: "Great book! Very insightful and engaging.",
            rating: 5,
            user: {
              name: "Khushi",
              avatar: "https://i.pravatar.cc/150?img=1",
            },
          },
          {
            text: "I loved the plot twists. A must-read for thriller fans.",
            rating: 4,
            user: {
              name: "Arun",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            text: "Decent read, but the ending was a bit predictable.",
            rating: 3,
            user: {
              name: "Santoshi",
              avatar: "https://i.pravatar.cc/150?img=3",
            },
          },
          {
            text: "Didn't enjoy it as much as I thought I would. The pacing was slow.",
            rating: 2,
            user: {
              name: "Lucky",
              avatar: "https://i.pravatar.cc/150?img=4",
            },
          },
          {
            text: "Not my cup of tea. Felt too cliche.",
            rating: 1,
            user: {
              name: "Lisa",
              avatar: "https://i.pravatar.cc/150?img=5",
            },
          },
        ];

        setReviews(fakeReviews); // Set the fake reviews with avatars
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setLoading(false);
      }
    };
    fetchBookData();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/v1/add-to-favourite",
        {},
        { headers }
      );
      console.log("Favourite added:", response.data);
      toast.success("Book added to your favourites!");
    } catch (error) {
      toast.error("Already in Favourites.");
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/v1/add-to-cart",
        {},
        { headers }
      );
      console.log("Book added to cart:", response.data);
      toast.success("Book added to your cart!");
    } catch (error) {
      console.error("Error adding book to cart:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Try again."
      );
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/add-review",
        { bookId: id, ...newReview },
        { headers }
      );
      setReviews([...reviews, response.data]);
      setNewReview({ text: "", rating: 0 });
      toast.success("Review added successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to add review. Try again.");
    }
  };

  // Handle the rating star click
  const handleRatingClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center my-8">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {bookData ? (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col gap-8">
          {/* Book Image and Details Section */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative bg-zinc-700 rounded p-4 h-[60vh] w-full md:w-2/5 flex items-center justify-center">
              <img
                className="h-[50vh] rounded"
                src={bookData.url}
                alt={bookData.title || "Book Cover"}
              />
              {isLoggedIn && role === "user" && (
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button
                    className="bg-white text-red-600 rounded-full text-2xl p-2 shadow-md"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white text-blue-600 rounded-full text-2xl p-2 shadow-md"
                    onClick={handleCart}
                  >
                    <FaCartPlus />
                  </button>
                </div>
              )}
            </div>
            <div className="p-4 w-full md:w-3/5 space-y-4">
              <h1 className="font-semibold text-3xl text-zinc-100">
                {bookData.title}
              </h1>
              <p className="text-lg text-zinc-400">by {bookData.author}</p>
              <p className="text-sm text-zinc-300 mt-4">
                {bookData.description}
              </p>
              <p className="text-sm text-zinc-400 mt-2">
                Language: {bookData.language}
              </p>
              <p className="font-semibold text-xl text-zinc-100 mt-4">
                <span className="line-through">₹{bookData.price}</span>{" "}
                <span className="text-green-600 ml-3 ">
                  {bookData.discountPercent}%
                </span>
              </p>
              <p className="font-semibold text-xl text-zinc-100 mt-4">
                Price: ₹{bookData.discountedPrice}
              </p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-2"
                onClick={handleCart}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-zinc-100">Reviews</h2>
            <div className="space-y-4 mt-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="p-4 bg-zinc-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src="https://imgs.search.brave.com/3L58XVCErl9Jwact_9hf94wgnvkan16Acz9ugZpCIj0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbmdz/ZXQuY29tL2ltYWdl/cy9pbWFnZS1vZi1w/cmluY2Vzcy1idWJi/bGVndW0tcHJvZmls/ZS1wcmVzYWxlLXB1/cnBsZS1sZWlzdXJl/LWFjdGl2aXRpZXMt/YmFkbWludG9uLXN0/b21hY2gtdHJhbnNw/YXJlbnQtcG5nLTY0/NTE2OS5wbmc"
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-zinc-100">
                          {review.user.name}
                        </div>
                        <div className="flex items-center space-x-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm text-zinc-300 mt-2">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-400">
                  No reviews yet. Be the first to review this book!
                </p>
              )}
            </div>
            {isLoggedIn && role === "user" && (
              <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
                <textarea
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                  className="w-full p-2 rounded bg-zinc-700 text-white"
                  placeholder="Write your review here..."
                  required
                ></textarea>

                {/* Star Rating */}
                <div className="flex items-center space-x-2 mt-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <FaStar
                      key={rating}
                      className={`cursor-pointer text-xl ${
                        newReview.rating >= rating
                          ? "text-yellow-400"
                          : "text-zinc-500"
                      }`}
                      onClick={() => handleRatingClick(rating)} // Handle star click
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <RelatedBooks />
    </>
  );
};

export default BookDetails;
