import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import gifss from "../../public/gifss.gif";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      const placeOrder = async () => {
        try {
          const headers = {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          };

          await axios.post(
            "https://backend-h759.onrender.com/api/v1/place-order",
            { session_id: sessionId },
            { headers }
          );

          toast.success("Order placed successfully!");

          setTimeout(() => {
            navigate("/profile/orderHistory");
          }, 4000);
        } catch (error) {
          console.error("Error placing order:", error);
          toast.error("Failed to place order");
        }
      };

      placeOrder();
    }
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-6 mb-6">
            <img src={gifss} alt="" />
          </div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order is being processed, and you
            will receive an email confirmation shortly.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/profile/orderHistory")}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
