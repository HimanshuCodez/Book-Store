import express from 'express';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import Order from '../models/order.model.js';
import authenticateToken from './userAuth.routes.js';
import stripe from "../stripe.js";
const router = express.Router();
//for users
router.post('/place-order', authenticateToken, async (req, res) => {
    try {
        const { session_id } = req.body;
        
        // Verify payment was successful
        const session = await stripe.checkout.sessions.retrieve(session_id);
        
        if (session.payment_status !== 'paid') {
            return res.status(400).json({ message: "Payment not successful" });
        }

        const userId = session.metadata.userId;
        const cartItemIds = JSON.parse(session.metadata.cartItems);

        // Create orders for each item
        for (const bookId of cartItemIds) {
            const newOrder = new Order({
                user: userId,
                book: bookId,
                status: 'Order Placed',
            });

            const orderDataFromdb = await newOrder.save();

            // Update user's orders and remove from cart
            await User.findByIdAndUpdate(userId, {
                $push: { orders: orderDataFromdb._id },
                $pull: { cart: bookId }
            });
        }

        res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error("Error during order placement:", error);
        res.status(500).json({ message: "Place order error" });
    }
});



router.get('/get-order-history', authenticateToken, async (req, res) => {

    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        })
        const ordersData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: ordersData,
            message: "history books fetched successfully"

        });
    } catch (error) {
        console.log('Error getting history', error);
        return res.status(500).json(error);
    }
});

//for admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({ path: "book", }).populate({ path: "user", }).sort({ createdAt: -1 });
        return res.status(200).json({
            status: "success",
            data: userData,
            message: "All orders fetched successfully"
        })

    } catch (error) {
      console.log('Error getting all orders', error);
        return res.status(500).json(error);
    }
})
router.get("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.params;
         await Order.findByIdAndUpdate(id,{status:req.body.status})
        return res.status(200).json({
            status: "success",          
            message: " update status successfully"
        })

    } catch (error) {
      console.log('Error getting update orders', error);
        return res.status(500).json(error);
    }
})




export default router;