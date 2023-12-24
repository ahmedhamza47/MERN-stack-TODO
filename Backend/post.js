const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const app = express();
const port = 3003;
let postedUserData = [];

app.use(cors());
app.use(express.json()); // Parse JSON data in the request body

const readDataFromFile = async () => {
  try {
    const data = await fs.readFile("./data.txt", "utf-8");
    console.log("Read data from file:", data);

    // Check if the data is an empty string
    if (data.trim() === "") {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data from file:", error);
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

// Write data to the file
const writeDataToFile = async (data) => {
  await fs.writeFile("./data.txt", JSON.stringify(data, null, 2), "utf-8");
};

app.post("/api/post", async (req, res) => {
  try {
    const newUserData = { ...req.body };

    // Read existing data from the file
    const existingData = await readDataFromFile();
    console.log(existingData, "existingData");
    // Add the new user data
    existingData.push(newUserData);

    // Write the updated data back to the file
    await writeDataToFile(existingData);

    res
      .status(200)
      .json({ status: 200, message: "Data received successfully" });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

// New route to fetch user data
app.get("/api/get", async (req, res) => {
  // Assuming you have a variable storing user data (replace it with your logic)
  const userData = await readDataFromFile();

  if (userData.length > 0) {
    console.log("data", userData);
    res.status(200).json({
      status: 200,
      message: "Data received successfully",
      data: userData,
    });
  } else {
    res.status(200).json({ status: 200, message: "Data not found", data: [] });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
