

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

import { v2 as cloudinary } from 'cloudinary';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();



// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('public/images'))
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);



// Health check route
app.get("/api", (req, res) => {
    res.json({ message: "API is Working..." });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});


export default app;
