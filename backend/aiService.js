require("dotenv").config();

const { validateStudyData } = require("./validateStudyData");

let aiClient = null;

async function getAIClient() {
  if (!aiClient) {
    const { GoogleGenAI } = await import("@google/genai");

    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return aiClient;
}

async function generateStudyMaterial(input) {
  const ai = await getAIClient();

  const prompt = `
You are an AI study assistant.

The user wants to study the following topic or notes:

${input}

Generate useful study material for the user.

Create:
- 5 flashcards
- 5 multiple-choice quiz questions

For each flashcard provide:
- question
- answer

For each quiz question provide:
- question
- exactly 4 options
- correctAnswer as the zero-based index of the correct option

Keep the questions relevant to the user's input.
Make the answers clear and suitable for learning.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          topic: {
            type: "string",
          },

          flashcards: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                },
                answer: {
                  type: "string",
                },
              },
              required: ["question", "answer"],
            },
          },

          quiz: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                },

                options: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },

                correctAnswer: {
                  type: "integer",
                },
              },

              required: [
                "question",
                "options",
                "correctAnswer",
              ],
            },
          },
        },

        required: ["topic", "flashcards", "quiz"],
      },
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response.");
  }

  let studyData;

  try {
    studyData = JSON.parse(response.text);
  } catch (error) {
    throw new Error("Gemini returned invalid JSON.");
  }

  const validationResult = validateStudyData(studyData);

  if (!validationResult.valid) {
    throw new Error(validationResult.error);
  }

  return validationResult.data;
}

module.exports = {
  generateStudyMaterial,
};