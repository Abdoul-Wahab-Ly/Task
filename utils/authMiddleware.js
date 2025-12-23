const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AppError = require("./AppError");

dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new AppError("Token manquant", 401);

    const [, token] = authHeader.split(" ");
    if (!token) throw new AppError("Token invalide", 401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
