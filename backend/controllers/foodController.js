// backend/controllers/foodController.js
import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "No image file uploaded." });
    }

    let image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        // YAHAN PAR BADLAV KIYA GAYA HAI
        console.log("Error during food.save():", error); // Error ko detail mein log karein
        res.json({ success: false, message: "Error adding food" });
    }
};

// ... baaki ka code waisa hi rahega
export { addFood, listFood, removeFood };
