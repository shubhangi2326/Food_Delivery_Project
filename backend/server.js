import 'dotenv/config' 
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRoute.js';

//app config
const app = express();
// const port = 4000; // Vercel apne aap port manage karega, iski zaroorat nahi

//middleware
app.use(express.json());
app.use(cors());

//DB Connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
// DHYAAN DE: Yeh line Vercel par kaam nahi karegi. Aapko Cloudinary jaisi service use karni hogi.
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req, res) => {
    res.send("API is Working...");
});



export default app;