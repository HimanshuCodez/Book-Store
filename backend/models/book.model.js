import mongoose from "mongoose";
//schema
const bookSchema = mongoose.Schema({
    name : String,
    price : Number,
    category : String,
    image: String,
    title: String

})
//model
const Book = mongoose.model("Book",bookSchema)

export default Book;
