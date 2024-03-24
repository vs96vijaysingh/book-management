const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = async (req, res, next) => {
  const reqData = req.body;
  const token = jwt.sign(reqData, SECRET_KEY);
  console.log("token=>", token);
  req.body.token = token;
  next();
};

const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }
  const decoded = jwt.verify(token, SECRET_KEY);
  console.log("Decoded token:", decoded);
  req.decoded = decoded;
  next();
};

module.exports = { generateToken, verifyToken };
