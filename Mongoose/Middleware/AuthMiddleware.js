const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

module.exports.userVerification = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token, "tokenHamza");
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, "secret", async (err, data) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ status: false, message: "Unauthorized: Token expired" });
      } else {
        return res
          .status(401)
          .json({ status: false, message: "Unauthorized: Invalid token" });
      }
    } else {
      const user = await User.findById(data.id);
      if (user) {
        req.user = user; // Attach the user to the request for later use if needed
        next(); // Call the next middleware or route handler
      } else {
        return res
          .status(401)
          .json({ status: false, message: "Unauthorized: User not found" });
      }
    }
  });
};
