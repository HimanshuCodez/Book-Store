import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

import cors from 'cors'
import userRoute from './routes/user.route.js' // Correct import for user routes
import bookRoute from './routes/book.route.js'; // Import for book routes



const app = express()
//middleware
app.use(express.json())
app.use(cors())

dotenv.config()
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;


//connect to mongdb
mongoose.connect(URI).then(() => {
  console.log('connected to mongodb')
}).catch((err) => {
  console.log(err)
})


// defining routes
app.use("/book",bookRoute)
app.use("/user",userRoute)



// app.post("/login",async(req,res)=>{
// const {email,password} = req.body
// if(!email || !password){
//   return res.status(400).json({error:"Please fill all the fields" })
// }
// const existingUser = await User.findOne({email})
// if(!existingUser){  
// return res.status(400).json({error:"Invalid Credentials" })
// }

// if (password !== existingUser.password){
//   return res.status(400).json({error:"Password Incorrect" })
// }
// return res.status(200).json({message:"login successfull"})
// })

// app.post("/signup",async(req,res)=>{
//   const {userName,email,password} = req.body
//   if( !userName || !email || !password){
//     return res.status(400).json({error:"Please fill all the fields" })
    
//   }
//   const existingUser = await User.findOne({email})
// if(existingUser){  
// return res.status(400).json({error:"Invalid Credentials" })
// }
// const createUser = await User.create({userName,email,password})
// await createUser.save()
// return res.status(200).json({message:"signup successfull"})

// })



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})


