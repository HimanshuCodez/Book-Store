import mongoose from "mongoose";
//schema
const userSchema = mongoose.Schema({
   fullname: {
     type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   }

   // wishList: [{
   //  type: mongoose.Schema.Types.ObjectId,
   //  ref: 'Book'
   // }]



})
//model
const User = mongoose.model("User", userSchema)

export default User;