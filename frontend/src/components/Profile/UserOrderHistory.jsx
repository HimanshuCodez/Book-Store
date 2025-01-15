import React, { useEffect, useState } from "react";
import axios from "axios";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
const headers ={
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
}
const user = 
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get("https://backend-h759.onrender.com/api/v1/get-order-history", {
        headers
        });
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Order History</h1>
      {orderHistory.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orderHistory.map((order) => (
            <li key={order._id} className="p-4 border rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700"> {order.url}</p>
              <p className="font-semibold text-gray-700">Order ID: {order._id}</p>
              <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Mode: {"COD"}</p>
              <p className="text-sm ">Status: <span className="text-green-500">{order.status}</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrderHistory;
