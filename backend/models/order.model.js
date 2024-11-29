import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',     
    },
    quantity: {
        type: Number,
        required: true, // Ensure quantity is provided when placing an order
        default: 1 // Default to 1 if not specified
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books', 
    },
    status: {
        type: String,
        enum: ['Order Placed','Out For Delivery', 'Delivered','Cancelled'],
        default: 'Order Placed'
    },

 }, { timestamps: true });

export default mongoose.model('order', orderSchema);