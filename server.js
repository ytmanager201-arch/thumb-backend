const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Root Route (Browser Test)
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// Generate Route (POST)
app.post("/generate", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      error: "Prompt is required"
    });
  }

  // Dummy AI response (for testing)
  const response = `You said: ${prompt}`;

  res.json({
    success: true,
    result: response
  });
});

// IMPORTANT: Railway PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
