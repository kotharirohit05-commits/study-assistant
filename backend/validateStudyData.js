function validateStudyData(data) {
  // Check that the response is an object
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      valid: false,
      error: "AI response must be an object.",
    };
  }

  // Check topic
  if (
    typeof data.topic !== "string" ||
    !data.topic.trim()
  ) {
    return {
      valid: false,
      error: "AI response has an invalid topic.",
    };
  }

  // Check flashcards
  if (
    !Array.isArray(data.flashcards) ||
    data.flashcards.length === 0
  ) {
    return {
      valid: false,
      error: "AI response must contain flashcards.",
    };
  }

  // Check every flashcard
  for (const flashcard of data.flashcards) {
    if (
      !flashcard ||
      typeof flashcard !== "object" ||
      typeof flashcard.question !== "string" ||
      !flashcard.question.trim() ||
      typeof flashcard.answer !== "string" ||
      !flashcard.answer.trim()
    ) {
      return {
        valid: false,
        error: "AI response contains an invalid flashcard.",
      };
    }
  }

  // Check quiz
  if (
    !Array.isArray(data.quiz) ||
    data.quiz.length === 0
  ) {
    return {
      valid: false,
      error: "AI response must contain quiz questions.",
    };
  }

  // Check every quiz question
  for (const quizQuestion of data.quiz) {
    if (
      !quizQuestion ||
      typeof quizQuestion !== "object"
    ) {
      return {
        valid: false,
        error: "AI response contains an invalid quiz question.",
      };
    }

    if (
      typeof quizQuestion.question !== "string" ||
      !quizQuestion.question.trim()
    ) {
      return {
        valid: false,
        error: "Quiz question is invalid.",
      };
    }

    if (
      !Array.isArray(quizQuestion.options) ||
      quizQuestion.options.length !== 4
    ) {
      return {
        valid: false,
        error: "Each quiz question must have exactly 4 options.",
      };
    }

    for (const option of quizQuestion.options) {
      if (
        typeof option !== "string" ||
        !option.trim()
      ) {
        return {
          valid: false,
          error: "Quiz options must be non-empty strings.",
        };
      }
    }

    if (
      !Number.isInteger(quizQuestion.correctAnswer) ||
      quizQuestion.correctAnswer < 0 ||
      quizQuestion.correctAnswer > 3
    ) {
      return {
        valid: false,
        error: "Quiz correctAnswer must be between 0 and 3.",
      };
    }

    // Check explanation
    if (
      typeof quizQuestion.explanation !== "string" ||
      !quizQuestion.explanation.trim()
    ) {
      return {
        valid: false,
        error: "Quiz explanation is missing or invalid.",
      };
    }
  }

  return {
    valid: true,
    data,
  };
}

module.exports = {
  validateStudyData,
};