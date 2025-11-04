// backend/routes/cartRoute.js (CORRECTED)
import express from 'express';
import { addToCart, getCart, removeFormCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFormCart);
cartRouter.post("/get", authMiddleware, getCart); // <-- Isko .get se .post kar do

export default cartRouter;