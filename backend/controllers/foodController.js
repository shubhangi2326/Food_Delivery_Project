// import foodModel from '../models/foodModel.js';
// import fs from 'fs'
// // Add food item
// export const addFood = async (req, res) => {
//   try {
//     const image_filename = `${req.file.filename}`;

//     const food = new foodModel({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       image: image_filename,
//     });

//     await food.save();
//     res.json({ success: true, message: 'Food Added' });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: 'Error adding food' });
//   }
// };

// // List all food items
// export const listFood = async (req, res) => {
//   try {
//     const foods = await foodModel.find();
//     res.json({ success: true, data: foods });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: 'Error fetching food list' });
//   }
// };


// //remove food item
// export const removeFood = async (req, res) => {
//   try {
//     const food = await foodModel.findById(req.body.id);
//     if (!food) return res.json({ success: false, message: 'Food not found' });

//     // Delete image file if exists
//     const filePath = `uploads/${food.image}`;
//     if (fs.existsSync(filePath)) {
//       fs.unlink(filePath, (err) => {
//         if (err) console.log('File delete error:', err);
//       });
//     }

//     // Delete food from database
//     await foodModel.findByIdAndDelete(req.body.id);
//     res.json({ success: true, message: 'Food Removed' });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: 'Error removing food' });
//   }
// };


import foodModel from '../models/foodModel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Add food item
export const addFood = async (req, res) => {
  try {
    // 1. Check if a file was uploaded
    if (!req.file) {
      return res.json({ success: false, message: 'No image file provided' });
    }

    // 2. Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'food-delivery-app' // Optional: Cloudinary mein ek folder bana dega
    });

    // 3. Delete the temporary file from the local 'uploads' folder
    fs.unlinkSync(req.file.path);

    // 4. Create a new food item with the Cloudinary image URL
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url, // Sabse zaroori badlaav: Yahan Cloudinary ka URL save hoga
    });

    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.log("Error in addFood:", error);
    res.json({ success: false, message: 'Error adding food' });
  }
};

// List all food items
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error fetching food list' });
  }
};

// Remove food item
export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: 'Food not found' });
    }

    // 1. Cloudinary se image delete karna
    // Image URL se public_id nikaalna
    const imageUrl = food.image;
    const publicId = imageUrl.split('/').pop().split('.')[0];
    
    // Cloudinary se image delete karna
    await cloudinary.uploader.destroy(`food-delivery-app/${publicId}`); // Folder ka naam bhi dein agar use kiya hai

    // 2. Database se food item delete karna
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.log("Error in removeFood:", error);
    res.json({ success: false, message: 'Error removing food' });
  }
};