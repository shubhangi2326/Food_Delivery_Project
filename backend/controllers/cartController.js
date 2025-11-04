// // backend/controllers/cartController.js (CORRECTED)
// import userModel from '../models/userModel.js';

// // Add items to user cart
// export const addToCart = async (req, res) => {
//     try {
//        let userData = await userModel.findById(req.userId);

//         if (!userData) {
//             return res.json({ success: false, message: "User not found." });
//         }
//         let cartData = await userData.cartData;
//         if (!cartData[req.body.itemId]) {
//             cartData[req.body.itemId] = 1;
//         } else {
//             cartData[req.body.itemId] += 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//         res.json({ success: true, message: "Added To Cart" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };

// // Remove items from user cart
// export const removeFormCart = async (req, res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         if (!userData) {
//             return res.json({ success: false, message: "User not found." });
//         }
//         let cartData = await userData.cartData;
//         if (cartData[req.body.itemId] > 0) {
//             cartData[req.body.itemId] -= 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//         res.json({ success: true, message: "Removed From Cart" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };

// // Fetch user cart data
// export const getCart = async (req, res) => {
//     try {
//         // Use req.body.userId to be consistent
//         let userData = await userModel.findById(req.body.userId);
//         if (!userData) {
//             return res.json({ success: false, message: "User not found." });
//         }
//         let cartData = await userData.cartData;
//         res.json({ success: true, cartData });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };
// backend/controllers/cartController.js (CORRECTED)
import userModel from '../models/userModel.js';

// Add items to user cart
export const addToCart = async (req, res) => {
    try {
        // Use req.userId from the auth middleware
        let userData = await userModel.findById(req.userId); 

        if (!userData) {
            return res.json({ success: false, message: "User not found." });
        }
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        // Also use req.userId here for consistency and correctness
        await userModel.findByIdAndUpdate(req.userId, { cartData }); 
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove items from user cart
export const removeFormCart = async (req, res) => {
    try {
        // Use req.userId from the auth middleware
        let userData = await userModel.findById(req.userId); 
        if (!userData) {
            return res.json({ success: false, message: "User not found." });
        }
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        // Also use req.userId here
        await userModel.findByIdAndUpdate(req.userId, { cartData }); 
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
export const getCart = async (req, res) => {
    try {
        // Use req.userId from the auth middleware, this is the main cause of your error
        let userData = await userModel.findById(req.userId); 
        if (!userData) {
            return res.json({ success: false, message: "User not found." });
        }
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};