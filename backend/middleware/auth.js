import jwt from 'jsonwebtoken';

// Middleware to authenticate requests using JWT
export const authenticateToken = (req, res, next) => {
  // console.log(req.headers);
  // const token = req.cookies.jwt;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied: : No token provided");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid Token");
    req.user = user;
    next();
  });
};