import express from 'express';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import authenticateToken from './userAuth.routes.js';

const router = express.Router();
//add book to favourite
router.put('/add-to-favourite', authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        // Validate inputs
        if (!bookid || !id) {
            return res.status(400).json({ message: 'Book ID and User ID are required' });
        }

        // Find user by ID
        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the book is already in favourites
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(400).json({ message: 'Book already in favourites' });
        }

        // Add the book to the user's favourites
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: 'Book added to favourites' });
    } catch (error) {
        console.error('Error adding book to favourites:', error);
        res.status(500).json({ message: 'An error occurred while adding to favourites', error });
    }
});

 router.put('/remove-from-favourite', authenticateToken, async (req, res) => {
    
        try {
            const { bookid, id } = req.headers;
            const userData = await User.findById(id)
          const isBookFavourite = userData.favourites.includes(bookid);
          if (isBookFavourite) {
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
          }
        
         return res.status(200).json({ message: 'Book removed to favourites' });
        } catch (error) {
            console.log('Error removing book to favourite', error);
            res.status(500).json(error);
        }
    });

//get all books from favourites

 router.get('/get-favourites-books', authenticateToken, async (req, res) => {
    
        try {
            const { id } = req.headers;
            const userData = await User.findById(id).populate("favourites")
          const favouriteBooks = userData.favourites;
         return res.json({
            status:"success",
            data: favouriteBooks,
            message: "Favourite books fetched successfully"
   
        });
        } catch (error) {
            console.log('Error getting favourites', error);
           return  res.status(500).json(error);
        }
    });



export default router;