const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));

    if (!decodedToken) {
      throw "Invalid User ID";
    } else {
      req.body.user = decodedToken;
      next();
    }
  } catch {
    res.status(401).json({
      error: "Invalid Token",
    });
  }
};
