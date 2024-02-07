const User = require("./Models/UserModel");
const { createSecretToken } = require("./Util/secretToken");
const bcrypt = require("bcrypt");
const Counter = require("./Models/CounterModel");
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    // Increment the counter and get the next value
    const counter = await Counter.findOneAndUpdate(
      { name: "userCounter" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    const customId = counter.value;
    console.log(customId, "customId1111111");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({
      id: customId,
      email,
      password,
      username,
      createdAt,
    });
    const token = createSecretToken(user._id);

    console.log(token, "token2222222222");
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 400, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: 400, message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(400)
        .json({ status: 400, message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      token: token,
      success: true,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};
