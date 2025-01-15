import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import Loader from "./Loader/Loader";
import {loadStripe} from '@stripe/stripe-js';
import Navbar from "./Navbar";

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
          "https://backend-h759.onrender.com/api/v1/get-cart-books",
          { headers }
        );
        setCart(response.data.data || []);
      } catch (error) {
        console.error("Error fetching cart books:", error);
        toast.error("No items in Cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (bookId) => {
    try {
      await axios.put(
        `https://backend-h759.onrender.com/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );
      setCart((prevCart) => prevCart.filter((item) => item._id !== bookId));
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart.");
    }
  };

  useEffect(() => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalAmount);
  }, [cart]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handleCheckout = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }
  
      
      const formattedCartItems = cart.map(item => ({
        name: item.name || 'Untitled Book',
        price: item.price,
        url: item.url,
        description: item.description || `Book ID: ${item._id}`, 
        quantity: 1,
        _id: item._id
      }));
  
      
      console.log('Sending cart items:', formattedCartItems);
  
      const response = await axios.post(
        "https://backend-h759.onrender.com/api/v1/checkout",
        { cartItems: formattedCartItems },
        { headers }
      );
  
      const { id: sessionId } = response.data;
  
      if (!sessionId) {
        throw new Error('No session ID received');
      }
  
      toast.loading("Redirecting to checkout...");
      
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId
      });
  
      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // More detailed error message
      if (error.response?.data?.error) {
        toast.error(`Checkout failed: ${error.response.data.error}`);
      } else {
        toast.error('Checkout failed. Please try again.');
      }
    }
  };
  
  // Also add this debug useEffect to check cart data when it's loaded
 

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 dark:text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex items-center justify-center mb-8">
          <FiShoppingCart className="w-8 h-8 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Your Cart
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center bg-white dark:bg-slate-700 rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <FiShoppingCart className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">Your cart is empty</p>
            <Link 
              to="/" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <Link to={`/view-book-details/${item._id}`}><img
                        src={item.url}
                        alt={item.name}
                        className="w-32 h-40 object-cover rounded-lg shadow-sm"
                      /></Link>
                      <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                          {item.name|| "No name "}
                        </h2>
                        <p className="text-purple-600 dark:text-purple-400 text-lg font-medium mb-4">
                          {formatCurrency(item.price)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="inline-flex items-center text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <FiTrash2 className="w-5 h-5 mr-2" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-base text-gray-600 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-base text-gray-600 dark:text-gray-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-purple-600">{formatCurrency(total)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200 text-lg font-semibold flex items-center justify-center"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;