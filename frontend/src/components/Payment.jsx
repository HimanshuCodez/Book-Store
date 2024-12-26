import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import ReviewCart from "./ReviewCart";

const stripePromise = loadStripe("pk_test_51QOZvGEb71cybCjRhqYHR8uxzsbMTrwJvd4zkJ1bQs6jgDtHJnedLt1FytsmG5vKpOEQh2qtpr2bRrDYSRbFC5mH00Zw37EnKv");

const Payment = () => {
  const location = useLocation();
  const { cart, total } = location.state.hasOwnProperty("cart")?location.state:{cart:[], total:0};

  const deliveryCharges = 50; // Flat delivery charges
  const handlingCharges = 8; // Flat handling charges

  return (
    <Elements stripe={stripePromise}>
      <div className="payment-container flex flex-col lg:flex-row max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-xl mt-6">
        {/* Cart Items Review Section */}
        <ReviewCart
          cart={cart}
          total={total}
          deliveryCharges={deliveryCharges}
          handlingCharges={handlingCharges}
        />

        {/* Payment Gateway Section */}
        <div className="payment-form-section w-full lg:w-1/2 pl-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Make a Payment</h2>
          <PaymentForm totalPrice={total + deliveryCharges + handlingCharges} />
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
