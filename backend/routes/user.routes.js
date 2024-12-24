import express from 'express';
import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import authenticateToken from './userAuth.routes.js';
const router = express.Router();


// Signup route
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check for missing fields
        if (!username || !email || !password || !address) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Check if email already exists
        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            username:username,
            email:email,
            password:hashPassword,
            address:address
        });

        // Save new user to the database
        await newUser.save();
        return res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.error("Error during signup:", error); // Log the error to understand the issue
        res.status(500).json({ message: "Sign up error", error: error.message });
    }
});


// Sign-in route
router.post("/sign-in", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET ,
            { expiresIn: "3d" }
        );

        // Send response with token and user details
        res.status(200).json({
            message: "Login successful",
            id: user._id,
            role: user.role,
            token: token
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error during login" });
    }
});


//get user info

router.get("/get-user-info",authenticateToken, async (req, res) => {
    try {
        const {id} =req.headers;
        const data = await User.findById(id).select('-password');

       return res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: "get user info error" });
    }
});


router.put("/update-address",authenticateToken,async(req,res)=>{

try {
     const {id} = req.headers;
     const {address} = req.body;
      await User.findByIdAndUpdate(id, {address:address});
     return res.status(200).json( {message:"address updated successfully"});
 
} catch (error) {
     res.status(500).json({ message: "Internal server error" });
}
})
export default router;


