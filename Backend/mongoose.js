const mongoose = require("mongoose");
// mongodb+srv://hamza:hamza@cluster0.26ihatw.mongodb.net/
mongoose
  .connect(
    "mongodb+srv://hamza:hamza@cluster0.26ihatw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
