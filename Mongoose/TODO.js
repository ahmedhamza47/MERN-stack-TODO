const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// mongodb+srv://hamza:hamza@cluster0.26ihatw.mongodb.net/
const { Schema } = mongoose;
const app = express();
const { MongoClient } = require("mongodb");
app.use(cors());
app.use(express.json()); // Parse JSON data in the request body

mongoose
  .connect("mongodb+srv://hamza:hamza@cluster0.26ihatw.mongodb.net/Todo")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const todoSchema = new Schema(
  {
    id: String,
    todo: String,
    completed: Boolean,
  },
  {
    versionKey: false,
  }
);
const Todo = mongoose.model("Todo", todoSchema);

const handleFetchTodoList = async () => {
  const todoList = await Todo.find();
  console.log(todoList, "todoList");
};

app.post("/save", async (req, res) => {
  console.log(req, "requestBody22222");
  try {
    const saveItem = {};
    const todoList = await Todo.find();
    if (!req.body.id) {
      const newTodo = new Todo({
        id: req.body.id || (todoList.length + 1).toString(),
        todo: req.body.todo,
        completed: false,
      });
      await newTodo.save();
    } else {
      await Todo.findOneAndUpdate(
        { id: req.body.id }, // Find the document by id
        { ...req.body, todo: req.body.todo }, // Update the document with the modified object
        {
          new: true,
        }
      );
      // await updateTodo.save();
    }
    res.status(200).json({ status: 200, message: "Data saved successfully" });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

app.get("/getTodo", async (req, res) => {
  try {
    console.log(req.query.id, "req.query");
    await Todo.findOneAndUpdate(
      { id: req.query.id },
      { completed: true },
      {
        new: true,
      }
    );

    const todoList = await Todo.find(
      {},
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
app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Todo.findOneAndDelete({
      id: req.params.id,
    });

    // If the document with the provided id doesn't exist, handle it accordingly
    if (!result) {
      return res.status(404).json({ status: 404, message: "Todo not found" });
    }

    console.log(result, "result");
    res.status(200).json({ status: 200, message: "Data deleted successfully" });
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
//     console.log(todoList, "todoList");
//     res.status(200).json({
//       status: 200,
//       data: newTodo.length > 0 ? newTodo : null,
//     });
//   } catch (error) {
//     res.status(500).json({ status: 500, message: "Internal Server Error" });
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3003");
});

// Todo.deleteMany({}).then((res) => {
//   console.log(res, "res");
// });
