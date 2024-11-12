// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   // Fetch user's orders data
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/v1/get-all-orders", { headers });
//         setOrders(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       {/* Loading state */}
//       {loading ? (
//         <div className="text-center">Loading Orders...</div>
//       ) : (
//         <div>
//           <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
//           {/* Display orders */}
//           {orders.length === 0 ? (
//             <p>No orders found.</p>
//           ) : (
//             <div className="space-y-4">
//               {orders.map((order) => (
//                 <div key={order._id} className="bg-gray-50 p-4 rounded-md shadow-sm">
//                   <h3 className="text-xl font-semibold">Order #{order.orderNumber}</h3>
//                   <p className="text-gray-700">Date: {new Date(order.date).toLocaleDateString()}</p>
//                   <p className="text-gray-700">Status: {order.status}</p>
//                   <div className="mt-2">
//                     <h4 className="font-semibold">Items:</h4>
//                     <ul className="list-disc pl-5">
//                       {order.items.map((item, index) => (
//                         <li key={index} className="text-gray-600">
//                           {item.title} (x{item.quantity})
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="mt-4">
//                     <p className="font-semibold">Total: ${order.totalAmount}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;
