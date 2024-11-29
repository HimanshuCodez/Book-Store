import express from "express";
import BookRequest from "../models/bookRequest";  // Path to your BookRequest model

const router = express.Router();

// Admin route to fetch all book requests
router.get('/admin/book-requests', async (req, res) => {
    try {
        // Fetch all book requests
        const requests = await BookRequest.find()
            .populate('user', 'username email') // Include user info
            .populate('book', 'title author') // Include book info
            .exec();
        
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book requests", error });
    }
});




router.post('/request-book', async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const newRequest = new BookRequest({
            user: userId,
            book: bookId,
            status: 'Pending'
        });

        await newRequest.save();
        res.status(201).json({ message: "Book request submitted successfully.", request: newRequest });
    } catch (error) {
        res.status(500).json({ message: "Error submitting book request", error });
    }
});

export default router;