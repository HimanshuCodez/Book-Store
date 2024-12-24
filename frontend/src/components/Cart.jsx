import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi"; // Importing the delete icon from react-icons
import toast from "react-hot-toast";
import Loader from "./Loader/Loader";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
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
        setCart(response.data.data || []); // Set cart data or an empty array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart books:", error);
        toast.error("Failed to fetch cart items.");
        setLoading(false);
      }
    };

    fetchCart();
  }, []); // Run only once on mount

  const removeFromCart = async (bookId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );
      // Update cart state after removal
      setCart((prevCart) => prevCart.filter((item) => item._id !== bookId)); // Remove item from the cart in the state
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart.");
    }
  };
  const PlaceOrder = async () => {
    try {
     const response = await axios.post(
        `http://localhost:4000/api/v1/place-order`,
        {order:cart},
        { headers }
      );
      // Update cart state after removal
      
console.log(response)
      
    } catch (error) {
      console.error("Error in place order:", error);
      toast.error("Failed");
    }
  };
  useEffect(() => {
    if (cart.length > 0) {
      const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
      setTotal(totalAmount);
    } else {
      setTotal(0);
    }
  }, [cart]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen dark:bg-slate-800 dark:text-white">
      <h1 className="text-3xl font-semibold text-gray-800 mt-8 mb-8 text-center">
        Your Cart
      </h1>
      {loading ? (
        <Loader />
      ) : cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg">No items in your cart.</p>
          <Link to="/" className="text-purple-500 underline">
            Shop Now
          </Link>
        </div>
      ) : (
        <div>
          {/* Cart items */}
          <div className="space-y-6 ">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between dark:bg-slate-800 dark:text-white p-4 rounded shadow-md"
              >
                {/* Book Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name || "no name available"}
                    </h2>
                    <p className="text-gray-500 dark:text-white">
                      Price: {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>

                {/* Delete Icon */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FiTrash2 size={24} />
                </button>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center border-t pt-4 mt-6">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(total)}
            </p>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-end mt-6">
          <div onClick={PlaceOrder} className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition text-lg font-semibold">

             Place Order
          </div>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
