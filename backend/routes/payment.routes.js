import express  from "express";
import Stripe from "stripe";
const router = express.Router();
import dotenv  from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
router.post("/create-payment-intent", async (req, res) => {
    const { amount, currency } = req.body;
  
    if (!amount || !currency) {
      return res.status(400).json({ success: false, message: "Amount and currency are required" });
    }
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe expects the amount in cents
        currency,
        payment_method_types: ["card"], // Accept card payments
      });
  
      res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Error creating payment intent:", error); // Logs full error details
      res.status(500).json({ success: false, error: error.message }); // Include error message for debugging
    }
  });
  

export default router;
