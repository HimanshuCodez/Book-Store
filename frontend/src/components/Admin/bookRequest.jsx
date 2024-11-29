import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBookRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all book requests
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/admin-book-requests");
        setRequests(data);
      } catch (err) {
        setError("Error fetching book requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">Book Requests</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-600">No book requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border border-gray-200">#</th>
                <th className="px-4 py-2 border border-gray-200">User</th>
                <th className="px-4 py-2 border border-gray-200">Email</th>
                <th className="px-4 py-2 border border-gray-200">Book Title</th>
                <th className="px-4 py-2 border border-gray-200">Author</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200 text-center">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-200">{request.user?.username || "N/A"}</td>
                  <td className="px-4 py-2 border border-gray-200">{request.user?.email || "N/A"}</td>
                  <td className="px-4 py-2 border border-gray-200">{request.book?.title || "N/A"}</td>
                  <td className="px-4 py-2 border border-gray-200">{request.book?.author || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookRequests;
