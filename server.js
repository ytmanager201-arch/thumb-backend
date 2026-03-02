const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// POST route
app.post("/generate", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: "Prompt is required"
    });
  }

  res.json({
    success: true,
    result: "You said: " + prompt
  });
});

// VERY IMPORTANT FOR RAILWAY
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
