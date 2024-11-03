import express from 'express';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import Order from '../models/order.model.js';
import authenticateToken from './userAuth.routes.js';

const router = express.Router();
//for users
router.post('/place-order', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromdb = await newOrder.save();
            //saving order in db
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromdb._id },
            });
            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }
        res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error("Error during order placement:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

)

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