import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
const stripePromise = loadStripe("pk_test_51QOZvGEb71cybCjRhqYHR8uxzsbMTrwJvd4zkJ1bQs6jgDtHJnedLt1FytsmG5vKpOEQh2qtpr2bRrDYSRbFC5mH00Zw37EnKv");

const PaymentForm = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setMessage("Stripe is not loaded yet. Please try again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Step 1: Get client secret from backend
      const { data } = await axios.post("http://localhost:4000/api/v1/payment/create-payment-intent", {
        amount: totalPrice * 100, // Amount in cents
        currency: "inr",
      });

      const clientSecret = data.clientSecret;

      // Step 2: Confirm the payment
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        
          billing_details: {
            name: customerDetails.name,
            email: customerDetails.email,
          },
        },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful! Thank you for your purchase.");
        setPaymentSuccess(true); // Set success state

        // Play success sound (Google Pay-like sound)
        const successSound = new Audio("Voicy_G pay success.mp3"); // Replace with your sound URL or path
        successSound.play();
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="payment-form">
      {!paymentSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4 text-center text-blue-700">Enter Payment Details</h3>

          {/* Customer Details */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerDetails.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Display Total Amount */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700">Total Amount (INR): ₹{totalPrice}</p>
          </div>

          {/* Card Element */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700" htmlFor="card">
              Card Details
            </label>
            <div className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
              <CardElement options={{ hidePostalCode: true }} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg mt-4 transform transition duration-300 hover:scale-105"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h3 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h3>
          <p className="text-lg mt-2 text-gray-700">Thank you for your purchase.</p>
          {/* Success Animation (GIF) */}
          <img
            src="https://media1.tenor.com/m/xPh7mDqOZ8UAAAAd/success.gif"
            alt="Success"
            className="mt-4 mx-auto"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
      )}

      {/* Display Message */}
      {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
    </div>
  );
};

const Payment = () => {
  const location = useLocation();
  const { cart, total } = location.state; // Receive cart and total from state

  // Example charges (replace with dynamic values if needed)
  const deliveryCharges = 50; // Flat delivery charges
  const handlingCharges = 8; // Flat handling charges
  const grandTotal = total + deliveryCharges + handlingCharges;

  return (
    <Elements stripe={stripePromise}>
      <div className="payment-container flex flex-col lg:flex-row max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-xl mt-6">
        {/* Cart Items Review Section */}
        <div className="review-section w-full lg:w-1/3 p-4 pr-6 border-r border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Review Your Cart</h3>
          <ul className="space-y-4">
            {cart.map((item, index) => (
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

        {/* Payment Gateway Section */}
        <div className="payment-form-section w-full lg:w-1/2 pl-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Make a Payment</h2>
          <PaymentForm totalPrice={grandTotal || 0} />
        </div>
      </div>
    </Elements>
  );
};





export default Payment;