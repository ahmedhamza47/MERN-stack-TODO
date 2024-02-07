const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Todo = require("./Models/TodoModel");
const { userVerification } = require("./Middleware/AuthMiddleware");

// mongodb+srv://hamza:hamza@cluster0.26ihatw.mongodb.net/

// const app = express();

// app.use(cors());
// app.use(express.json()); // Parse JSON data in the request body

// mongoose
//   .connect("mongodb+srv://hamza:hamza@cluster0.26ihatw.mongodb.net/Todo")
//   .then(() => {
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database:", error);
//   });

// const handleFetchTodoList = async () => {
//   const todoList = await Todo.find();
// };

module.exports.SaveTodo =
  ("/save",
  userVerification,
  async (req, res) => {
    try {
      const userId = req.user.id; // Get the authenticated user's ID
      const todoList = await Todo.find({ userId: userId }); // Fetch todos for the user
      if (!req.body.id) {
        const newTodo = new Todo({
          userId: userId,
          id: (todoList.length + 1).toString(),
          todo: req.body.todo,
          completed: false,
        });
        await newTodo.save();
      } else {
        await Todo.findOneAndUpdate(
          { user: userId, id: req.body.id }, // Find the document by user and todo id
          { ...req.body, todo: req.body.todo }, // Update the document with the modified object
          { new: true }
        );
      }

      res.status(200).json({ status: 200, message: "Data saved successfully" });
    } catch (error) {
      console.error("Error processing the request:", error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  });

module.exports.GetTodo =
  ("/getTodo",
  userVerification,
  async (req, res) => {
    try {
      // await Todo.findOneAndUpdate(
      //   { id: req.query.id },
      //   { completed: true },
      //   {
      //     new: true,
      //   }
      // );
      const userId = req.user.id;
      const todoList = await Todo.find(
        { userId: userId },
        { _id: 0, id: 1, todo: 1, completed: 1 }
      );
      // const updateTodo = todoList.map((item) => {
      //   if (item.id === req.query.id) {
      //     item.completed = !item.completed;
      //   }
      //   return item;
      // });
      res.status(200).json({
        status: 200,
        data: todoList.length > 0 ? todoList : null,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  });
module.exports.DeleteTodo =
  ("/delete/:id",
  userVerification,
  async (req, res) => {
    try {
      const result = await Todo.findOneAndDelete({
        id: req.params.id,
      });

      // If the document with the provided id doesn't exist, handle it accordingly
      if (!result) {
        return res.status(404).json({ status: 404, message: "Todo not found" });
      }

      res
        .status(200)
        .json({ status: 200, message: "Data deleted successfully" });
    } catch (error) {
      console.error("Error processing the request:", error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  });

// app.get("/completed/:id", async (req, res) => {
//   try {
//     const todoList = await Todo.find();
//     const newTodo = todoList.map((item) => {
//       if (item.id === req.params.id) {
//         item.completed = !item.completed;
//       }
//       return item;
//     });
//     res.status(200).json({
//       status: 200,
//       data: newTodo.length > 0 ? newTodo : null,
//     });
//   } catch (error) {
//     res.status(500).json({ status: 500, message: "Internal Server Error" });
//   }
// });

// app.listen(3000, () => {
// });

// Todo.deleteMany({}).then((res) => {
// });
