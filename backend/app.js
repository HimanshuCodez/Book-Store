import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from "./routes/user.routes.js";
import bookRoute from './routes/book.routes.js';
import favouriteRoute from './routes/favourite.routes.js';
import cartRoute from './routes/cart.routes.js';
import orderRoute from './routes/order.routes.js';
import paymentRoute from './routes/payment.routes.js'; // Correctly import the route
import path from "path";
import { fileURLToPath } from "url";
 // Import PDFKit for invoice generation

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 1000;
const URI = process.env.URI;

mongoose.connect(URI)
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.log(err));

app.use(express.json());

// Use your routes
app.use("/api/v1", userRoute);
app.use("/api/v1/books", bookRoute);
app.use("/api/v1", favouriteRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute); // Ensure this is correctly used

// Static files setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
