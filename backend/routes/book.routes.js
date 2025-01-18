import express from 'express';
import User from '../models/user.model.js';

import Book from '../models/book.model.js';
import authenticateToken from './userAuth.routes.js';
 const router = express.Router();
//admin routes
router.post("/add-book", authenticateToken,async(req,res)=>{
    try {
        //to check user is admin or not
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res.status(403).json({ message: "You are not an admin" });
        }
        //book
        const { url,title, author, price,description,language } = req.body;
        const newBook = new Book({
            url: url,
            title: title,
            author: author,
            price: price,
            description: description,
            language: language
           
        });
        await newBook.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.log("err addBook", error);
        res.status(500).json(error)
    }
})
router.put("/update-book", authenticateToken,async(req,res)=>{
    try {
        //to check user is admin or not
        const {bookid} = req.headers;
        
        // if(user.role !== "admin"){
        //     return res.status(403).json({ message: "You are not an admin" });
        // }
        //book
        const { url,title, author, price,description,language } = req.body;
        await Book.findByIdAndUpdate(bookid,{
            url: url,
            title: title,
            author: author,
            price: price,
            description: description,
            language: language
           
        });
        
         return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.log("err addBook", error);
        return res.status(500).json(error)
    }
})
router.delete("/delete-book", authenticateToken,async(req,res)=>{
    try {
        //to check user is admin or not
        const {bookid} = req.headers;
        
        // if(user.role !== "admin"){
        //     return res.status(403).json({ message: "You are not an admin" });
        // }
        //book
        const { url,title, author, price,description,language } = req.body;
        await Book.findByIdAndDelete(bookid,{
            url: url,
            title: title,
            author: author,
            price: price,
            description: description,
            language: language
           
        });
        
         return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log("err addBook", error);
        return res.status(500).json(error)
    }
})

//public routes
router.get('/get-all-books',async (req, res)=>{
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.json({
            status: "succesfully fetched books",
            data: books,
        });
    } catch (error) {
        console.log("err getAllBooks", error);
        res.status(500).json(error)
    }
})
router.get('/get-recent-books',async (req, res)=>{
    try {
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        res.json({
            status: "succesfully fetched recent books",
            data: books,
        });
    } catch (error) {
        console.log("err getAllBooks", error);
        res.status(500).json(error)
    }
})

router.get("/get-book-by-id/:id",async(req,res)=>{
    try {
        //to check user is admin or not
        const {id} = req.params;
        const book = await Book.findById(id);
       
            return res.json({ status:"success",data: book,});
      
    
    } catch (error) {
        console.log("err addBook", error);
        res.status(500).json(error)
    }
})

// Search endpoint
router.get('/search', async (req, res) => {
    try {
      const { q, filter } = req.query;
      
      if (!q) {
        return res.status(400).json({ message: 'Search query is required' });
      }
      
      const searchRegex = new RegExp(q.trim(), 'i');
      
      let searchQuery = {};
      
      if (filter && filter !== 'all') {
        searchQuery[filter] = searchRegex;
      } else {
        searchQuery = {
          $or: [
            { name: searchRegex },
            { author: searchRegex },
            { language: searchRegex },
            { description: searchRegex },
            { isbn: searchRegex }
          ]
        };
      }
      
      const books = await Book.find(searchQuery)
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();
      
      return res.json(books);
      
    } catch (error) {
      console.error('Search error:', error);
      return res.status(500).json({ message: 'Server error during search' });
    }
  });


export default router;