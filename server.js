const express = require("express");
const cors = require("cors");

const app = express();

/* ========================
   MIDDLEWARES
======================== */
app.use(cors());
app.use(express.json());

/* ========================
   ROOT ROUTE
======================== */
app.get("/", (req, res) => {
  res.status(200).send("Backend is working 🚀");
});

/* ========================
   GENERATE ROUTE (POST)
======================== */
app.post("/generate", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: "Prompt is required"
    });
  }

  return res.status(200).json({
    success: true,
    result: "You said: " + prompt
  });
});

/* ========================
   404 HANDLER
======================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

/* ========================
   IMPORTANT FOR RAILWAY
======================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port " + PORT);
});
