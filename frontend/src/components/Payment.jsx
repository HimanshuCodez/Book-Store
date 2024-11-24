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
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold mb-2">Enter Payment Details</h3>

          {/* Customer Details */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerDetails.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Display Total Amount */}
          <div className="mb-4">
            <p className="text-sm font-semibold">Total Amount (INR): ₹{totalPrice}</p>
          </div>

          {/* Card Element */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="card">
              Card Details
            </label>
            <div className="border p-2 rounded">
              <CardElement options={{ hidePostalCode: true }} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      ) : (
        <div className="text-center">
         
          <h3 className="text-2xl font-bold text-green-600 fade-in">Payment Successful!</h3>
          <p className="text-lg mt-2 fade-in">Thank you for your purchase.</p>
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
      {message && <p className="mt-4 text-center text-sm text-red-600 fade-in">{message}</p>}
    </div>
  );
};

const Payment = () => {
  const location = useLocation();
  const { cart, total } = location.state; // Receive cart and total from state

  return (
    <Elements stripe={stripePromise}>
      <div className="payment-container max-w-md mx-auto bg-gray-100 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
        <PaymentForm totalPrice={total} />
      </div>
    </Elements>
  );
};

export default Payment;
