import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  console.log("isAuth middleware called");

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No Authorization header");
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log("No token found after Bearer");
    return res.status(401).json({ message: 'Token missing from header' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log("Token decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT error:", error.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
