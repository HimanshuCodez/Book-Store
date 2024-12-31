import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from "./routes/user.routes.js"
import bookRoute from './routes/book.routes.js'
import favouriteRoute from './routes/favourite.routes.js'
import cartRoute from './routes/cart.routes.js'
import orderRoute from './routes/order.routes.js'
import paymentRoute from './routes/payment.routes.js'
import bookRequestRoute from './routes/bookRequests.routes.js'
const app = express();
app.use(cors())
dotenv.config()

 const PORT = process.env.PORT || 1000
const URI = process.env.URI

 mongoose.connect(URI).then(() => {
    console.log('connected to mongodb')
  }).catch((err) => {
    console.log(err)
  })

app.use(express.json())


app.use("/api/v1",userRoute)
app.use("/api/v1",bookRoute)
app.use("/api/v1",favouriteRoute)
app.use("/api/v1",cartRoute)
app.use("/api/v1",orderRoute)
app.use("/api/v1",bookRequestRoute)
app.use("/api/v1", paymentRoute);








app.listen(PORT, ()=>
  console.log(`server listening on ${PORT}`)
)

