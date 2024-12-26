import mongoose from "mongoose";
//schema
const userSchema = new mongoose.Schema({
   username: {
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
   },
   address: {
      type: String,
      required: true,
   },
   avatar: { type: String, default:"https://imgs.search.brave.com/3L58XVCErl9Jwact_9hf94wgnvkan16Acz9ugZpCIj0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbmdz/ZXQuY29tL2ltYWdl/cy9pbWFnZS1vZi1w/cmluY2Vzcy1idWJi/bGVndW0tcHJvZmls/ZS1wcmVzYWxlLXB1/cnBsZS1sZWlzdXJl/LWFjdGl2aXRpZXMt/YmFkbWludG9uLXN0/b21hY2gtdHJhbnNw/YXJlbnQtcG5nLTY0/NTE2OS5wbmc" },
   role:{
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    favourites:[{ 
      type : mongoose.Schema.Types.ObjectId,
      ref : "books",
   },],
    cart:[{ 
      type : mongoose.Schema.Types.ObjectId,
      ref : "books",
   },],
    orders:[{ 
      type : mongoose.Schema.Types.ObjectId,
      ref : "order",
   },],
},
{timestamps:true})

export default mongoose.model("user", userSchema);