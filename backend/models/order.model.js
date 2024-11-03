import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',     
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
    // totalPrice: {
    //     type: Number,
    //     required: true
    // },
    // orderDate: {
    //     type: Date,
    //     default: Date.now
    // }
 }, { timestamps: true });

export default mongoose.model('order', orderSchema);