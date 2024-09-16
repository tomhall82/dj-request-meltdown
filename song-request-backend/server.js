const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// In-memory storage (replace with a database in production)
let requests = [];

app.use(cors());
app.use(bodyParser.json());

// Get all requests
app.get("/requests", (req, res) => {
  res.json(requests);
});

// Add a new request
app.post("/requests", (req, res) => {
  const newRequest = req.body;
  requests.push(newRequest);
  res.status(201).json(newRequest);
});

// Delete a request by index
app.delete("/requests/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < requests.length) {
    requests.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).send("Request not found");
  }
});

// Delete all requests
app.delete("/requests", (req, res) => {
  requests = [];
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
