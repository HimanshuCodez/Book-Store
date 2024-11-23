import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi"; // Importing the delete icon from react-icons
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/get-cart-books",
          { headers }
        );
        setCart(response.data.data); // Assuming the cart data is in response.data.data
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching cart books:", error);
        setLoading(false);
      }
    };

    fetchCart();
  }, [cart]); // Runs only once on mount

  const removeFromCart = async (bookid) => {
    const response = await axios.put(
        `http://localhost:4000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      console.log(response);
      toast.success("removed from cart")
    }

  const calculateTotal = () => {
    return cart?.items?.reduce(
      (total, item) => total + (item.price || 0), // Remove quantity logic
      0
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2, // Keeps it to 2 decimal places
    }).format(amount);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mt-8 mb-8 text-center">
        Your Cart
      </h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : cart.items?.length === 0 ? (
        <div className="text-center">
          Your cart is empty.{" "}
          <Link to="/" className="text-purple-500 underline">
            Shop Now
          </Link>
        </div>
      ) : (
        <div>
          {/* Cart items */}
          <div className="space-y-6">
            {cart.map((item,i) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4"
              >
                {/* Book Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">
                      {formatCurrency(item.price || 0)} {/* Format as currency */}
                    </p>
                  </div>
                </div>

                {/* Item Total & Delete Icon */}
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {formatCurrency(item.price || 0)} {/* Single item price */}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 size={24} /> {/* Trash icon */}
                  </button>
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="flex justify-between items-center border-t pt-4">
              <h2 className="text-xl font-bold">Total:</h2>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(calculateTotal())} {/* Format total as currency */}
              </p>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-end mt-6">
              <Link
                to="/checkout"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition text-lg font-semibold"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
