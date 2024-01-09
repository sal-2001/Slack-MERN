const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded?.id;
    next();
  } catch (error) {
    console.log("unauthorized access");
    console.log(error);
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
