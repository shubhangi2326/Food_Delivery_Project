// import express from 'express';
// import multer from 'multer';
// import { addFood, listFood, removeFood } from '../controllers/foodController.js';

// const foodRouter = express.Router();

// // Image storage setup
// const storage = multer.diskStorage({
//   destination: 'uploads',
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// // Routes
// foodRouter.post('/add', upload.single('image'), addFood);
// foodRouter.get('/list', listFood);
// foodRouter.post('/remove',removeFood)

// export default foodRouter;


import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// Image Storage Engine (Multer configuration)
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood); // 'upload.single("image")' middleware add karein
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;