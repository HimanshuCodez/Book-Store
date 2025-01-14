//how to get this shit done import express from "express";
// import BookRequest from "../models/bookRequest.model.js";  // Path to your BookRequest model
// import authenticateToken from "./userAuth.routes.js";

// const router = express.Router();

// // Admin route to fetch all book requests
// router.get('/admin-book-requests', async (req, res) => {
//     try {
//         // Fetch all book requests
//         const requests = await BookRequest.find()
//             .populate('user', 'username email') // Include user info
//             .populate('book', 'title author') // Include book info
//             .exec();
        
//         res.json(requests);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching book requests", error });
//     }
// });




// router.post('/user-request-book',authenticateToken, async (req, res) => {
//     const {  bookid } = req.body;
//     const { id } = req.headers;
//     try {
//         const newRequest = new BookRequest({
//             user: id,
//             book: bookid,
//             status: 'Pending'
//         });

//         await newRequest.save();
//         res.status(201).json({ message: "Book request submitted successfully.", request: newRequest });
//     } catch (error) {
//         res.status(500).json({ message: "Error submitting book request", error });
//     }
// });

// export default router;