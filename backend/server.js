const express = require("express");
const cors = require("cors");
const { generateStudyMaterial } = require("./aiService");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Study Assistant backend is running!",
  });
});

// Generate study material
app.post("/api/generate", async (req, res) => {
  const { input } = req.body;

  // Validate input
  if (!input || !input.trim()) {
    return res.status(400).json({
      error: "Study topic or notes are required.",
    });
  }

  try {
    const studyMaterial = await generateStudyMaterial(input.trim());

    res.json(studyMaterial);
  } catch (error) {
    console.error("AI generation error:", error);

    res.status(500).json({
      error: "Failed to generate study material.",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});