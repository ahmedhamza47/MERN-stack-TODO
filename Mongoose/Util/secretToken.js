require("dotenv").config();
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports.createSecretToken = (id) => {
  const token = jwt.sign({ id }, "secret", {
    expiresIn: "1min",
  });
  console.log(token, "token1111111111");
  const decodedToken = jwt.decode(token);
  console.log("Decoded Token:", decodedToken);

  return token;
};
