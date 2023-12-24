const mongoose = require("mongoose");
// mongodb+srv://hamza:hamza@cluster0.26ihatw.mongodb.net/
const { Schema } = mongoose;
mongoose
  .connect("mongodb+srv://hamza:hamza@cluster0.26ihatw.mongodb.net/Test")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const userSchema = new Schema({
  name: String,
  email: String,
  age: Number,
});
const User = mongoose.model("User", userSchema);
// module.exports = User;
const isSaveUser = false;
const handleSaveUser = async () => {
  if (isSaveUser) {
    const newUser = new User({
      name: "Hamza",
      email: "hamza@gmail.com",
      age: 22,
    });
    const user = await newUser.save();
    console.log(user, "userssssss");
  }
};
handleSaveUser();
// newUser.save().then((user) => {
//   console.log(user);
// });

//read data from database
User.find().then((users) => {
  console.log(users, "users");
});

//update data from database
const handleUpdate = async () => {
  const result = await User.findByIdAndUpdate("658017d2b7718316e44886e4", {
    name: "Hamza",
    email: "test@gmail.com",
    age: 22,
  });
  console.log(result, "result");
};
handleUpdate();

const handleDelete = async () => {
  const result = await User.findByIdAndDelete("658017d2b7718316e44886e4");
  console.log(result, "result");
};
handleDelete();
