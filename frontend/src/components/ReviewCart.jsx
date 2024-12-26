import React from "react";

const ReviewCart = ({ cart, total, deliveryCharges, handlingCharges }) => {
  const grandTotal = total + deliveryCharges + handlingCharges;

  return (
    <div className="review-section w-full lg:w-1/3 p-4 pr-6 border-r border-gray-200">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Review Your Cart</h3>
      <ul className="space-y-4">
        { cart&&cart.length>-1 && cart.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 border-b border-gray-200 pb-4"
          >
            {/* Item Image */}
            <img
              src={item.url || "https://via.placeholder.com/100"} // Fallback image
              alt={item.name || "Product"}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <p className="font-medium text-gray-800">{item.name || "Unnamed Product"}</p>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity || 1} | Price: ₹{item.price || 0}
              </p>
              <p className="font-medium text-gray-700">
                Total: ₹{(item.price || 0) * (item.quantity || 1)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Additional Charges Section */}
      <div className="additional-charges mt-6 space-y-4">
        <div className="flex justify-between text-gray-700">
          <p className="font-medium">Subtotal:</p>
          <p>₹{total}</p>
        </div>
        <div className="flex justify-between text-gray-700">
          <p className="font-medium">Delivery Charges:</p>
          <p>₹{deliveryCharges}</p>
        </div>
        <div className="flex justify-between text-gray-700">
          <p className="font-medium">Handling Charges:</p>
          <p>₹{handlingCharges}</p>
        </div>
        <div className="flex justify-between text-gray-900 font-semibold border-t pt-4">
          <p>Grand Total:</p>
          <p>₹{grandTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCart;
