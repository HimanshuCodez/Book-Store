// Backend route (checkout.routes.js)
import express from 'express';
import User from "../models/user.model.js";
import stripe from "../stripe.js";
import authenticateToken from './userAuth.routes.js';
const router = express.Router();

router.post('/checkout', authenticateToken, async(req,res) => {
  try {
    const {cartItems} = req.body;
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });
    
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        {
          shipping_rate: 'shr_1QbyxKEb71cybCjRzk0FBevK',
        },
      ],
      customer_email: user.email,
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            images: [item.url],
            description: item.description,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity || 1,
      })),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };
    
    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json({ id: session.id }); // Changed status code and response format
  } catch (error) {
    console.error('Payment route error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;