import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Link } from "react-router-dom";

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
  }, []); // Runs only once on mount

  const updateQuantity = async (bookId, quantity) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/v1/update-cart-book/${bookId}`,
        { quantity },
        { headers }
      );
      // Re-fetch cart after updating quantity
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/remove-from-cart/${bookId}`,
        { headers }
      );
      // Re-fetch cart after removal
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotal = () => {
    return cart?.items?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
            {cart.map((item, i) => (
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
                    <p className="text-gray-500">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    disabled={item.quantity === 1}
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    +
                  </button>
                </div>

                {/* Item Total & Remove */}
                <div className="text-right">
                  <p className="text-lg font-bold">
                    
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-sm text-red-500 hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="flex justify-between items-center border-t pt-4">
              <h2 className="text-xl font-bold">Total:</h2>
              <p className="text-2xl font-bold text-green-600">
               
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
