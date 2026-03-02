const express = require("express");
const cors = require("cors");

const app = express();

/* ========================
   MIDDLEWARES
======================== */
app.use(cors());
app.use(express.json());

/* ========================
   ROOT ROUTE (TEST)
======================== */
app.get("/", (req, res) => {
  res.status(200).send("Backend is working 🚀");
});

/* ========================
   GENERATE ROUTE (POST)
======================== */
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required"
      });
    }

    // 🔹 Dummy Response (Replace with AI later)
    const aiResponse = `You said: ${prompt}`;

    return res.status(200).json({
      success: true,
      result: aiResponse
    });

  } catch (error) {
    console.error("Error in /generate:", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
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
   RAILWAY PORT (VERY IMPORTANT)
======================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
