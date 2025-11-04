import foodModel from '../models/foodModel.js';
import fs from 'fs'
// Add food item
export const addFood = async (req, res) => {
  try {
    const image_filename = `${req.file.filename}`;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error adding food' });
  }
};

// List all food items
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error fetching food list' });
  }
};


//remove food item
export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) return res.json({ success: false, message: 'Food not found' });

    // Delete image file if exists
    const filePath = `uploads/${food.image}`;
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.log('File delete error:', err);
      });
    }

    // Delete food from database
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error removing food' });
  }
};
