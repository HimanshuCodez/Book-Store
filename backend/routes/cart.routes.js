import express from 'express';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import authenticateToken from './userAuth.routes.js';

const router = express.Router();
//add book to favourite
router.put('/add-to-cart', authenticateToken, async (req, res) => {

    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id)
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            return res.status(400).json({ message: 'Book already in cart' });
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
        return res.status(200).json({ message: 'Book added to cart' });
    } catch (error) {
        console.log('Error adding book to cart', error);
        res.status(500).json(error);
    }
});
router.put('/remove-from-cart/:bookid', authenticateToken, async (req, res) => {

    try {
        const { bookid, id } = req.headers;
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        return res.status(200).json({ message: 'Book removed to cart' });
    } catch (error) {
        console.log('Error removing book to favourite', error);
        res.status(500).json(error);
    }
});

//get all books from cart

router.get('/get-cart-books', authenticateToken, async (req, res) => {

    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart")
        const cart = userData.cart.reverse();//recently added to cart item will be on top of cart item
        return res.json({
            status: "success",
            data: cart,
           

        });
    } catch (error) {
        console.log('Error getting cart', error);
        return res.status(500).json(error);
    }
});



export default router;