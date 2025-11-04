import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // fix env
    req.userId = token_decode.id; // store in req.userId
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Token is invalid" });
  }
};

export default authMiddleware;
