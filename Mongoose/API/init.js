const { userVerification } = require("../Middleware/AuthMiddleware");
const User = require("../Models/UserModel");

module.exports.init =
  ("/init",
  userVerification,
  async (req, res) => {
    try {
      const user = req.user;
      const selectedFields = await User.findById(user._id, {
        _id: 0,
        id: 1,
        username: 1,
        email: 1,
      });

      return res.status(200).json({
        status: 200,
        message: "User logged in successfully",
        data: selectedFields,
      });
    } catch (error) {
      console.error("Error processing the request:", error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  });
