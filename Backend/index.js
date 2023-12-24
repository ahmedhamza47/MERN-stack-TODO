const http = require("http");
const cors = require("cors");
const axios = require("axios");

const server = http.createServer(async (req, res) => {
  // Enable CORS for all routes
  cors()(req, res, () => {});
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Welcome</h1>");
  }

  if (req.url === "/api/post") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    try {
      const jsonData = await getJSonData();
      // console.log(jsonData, "jsonData");
      res.end(JSON.stringify(jsonData));
    } catch (error) {
      console.error("Error fetching JSON data:", error);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

async function getJSonData() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data;
}

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
