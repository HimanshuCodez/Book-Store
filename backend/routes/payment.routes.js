import express from "express";
import User from "../models/user.model.js";
import stripe from "../stripe.js";
import authenticateToken from "./userAuth.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';

const router = express.Router();

// Invoice generation route
router.get("/invoices/:orderId", (req, res) => {
  const { orderId } = req.params;

  // Example order data
  const order = {
    id: orderId,
    user: { name: "John Doe", email: "johndoe@example.com" },
    items: [
      { name: "Book 1", price: 200, quantity: 2 },
      { name: "Book 2", price: 150, quantity: 1 },
    ],
  };

  const doc = new PDFDocument();
  const filename = `invoice-${order.id}.pdf`;

  // Set headers to force download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

  // Generate PDF content
  doc.fontSize(20).text("Your BookStore", { align: "center" });
  doc.fontSize(14).text(`Invoice for Order #${order.id}`, { align: "center" });
  doc.moveDown();
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();
  doc.text(`Customer: ${order.user.name}`);
  doc.text(`Email: ${order.user.email}`);
  doc.moveDown();
  doc.text("Order Details:");
  let total = 0;
  order.items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    doc.text(`${item.name}: ₹${item.price} x ${item.quantity} = ₹${itemTotal}`);
    total += itemTotal;
  });
  doc.moveDown();
  doc.text(`Total Amount: ₹${total}`, { align: "right" });
  doc.end();

  // Pipe PDF to response
  doc.pipe(res);
});

// Checkout route for creating Stripe session
router.post('/checkout', authenticateToken, async (req, res) => {
    try {
        const { cartItems } = req.body;
        const userId = req.user.id;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1QbyxKEb71cybCjRzk0FBevK',
                },
            ],
            customer_email: user.email,
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                        images: [item.url],
                        description: item.description,
                        category: item.category,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity || 1,
            })),
            metadata: {
                userId: userId,
                cartItems: JSON.stringify(cartItems)
            },
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Payment route error:', error);
        res.status(500).json({ error: error.message });
    }
});




export default router;
