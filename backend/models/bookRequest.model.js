import mongoose from "mongoose";

const bookRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',  
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',  
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now  
    },
    status: {
        type: String,
        enum: ['Pending', 'Fulfilled', 'Rejected'], 
        default: 'Pending'
    },
    message: {
        type: String,
        default: ''  
    }
}, { timestamps: true });

export default mongoose.model("bookRequest", bookRequestSchema);
