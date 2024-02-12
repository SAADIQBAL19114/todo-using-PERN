const jwt = require("jsonwebtoken");
const { tokens } = require("../sequelize/models");

const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(403).json({
      message: "Please login first",
    });
  }
  try {
    const tokenRecord = await tokens.findOne({ where: { token } });
    if (!tokenRecord || tokenRecord.expired) {
      return res.status(403).json({
        message: "Unauthorized user",
      });
    }
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    // console.log(req);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = auth;
