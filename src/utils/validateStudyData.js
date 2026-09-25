function validateStudyData(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      valid: false,
      error: "Invalid study material received.",
    };
  }

  if (
    typeof data.topic !== "string" ||
    !data.topic.trim()
  ) {
    return {
      valid: false,
      error: "Study topic is missing.",
    };
  }

  if (
    !Array.isArray(data.flashcards) ||
    data.flashcards.length === 0
  ) {
    return {
      valid: false,
      error: "No flashcards were generated.",
    };
  }

  for (const flashcard of data.flashcards) {
    if (
      !flashcard ||
      typeof flashcard.question !== "string" ||
      !flashcard.question.trim() ||
      typeof flashcard.answer !== "string" ||
      !flashcard.answer.trim()
    ) {
      return {
        valid: false,
        error: "Some flashcards are invalid.",
      };
    }
  }

  if (
    !Array.isArray(data.quiz) ||
    data.quiz.length === 0
  ) {
    return {
      valid: false,
      error: "No quiz questions were generated.",
    };
  }

  for (const question of data.quiz) {
    if (
      !question ||
      typeof question.question !== "string" ||
      !question.question.trim()
    ) {
      return {
        valid: false,
        error: "A quiz question is invalid.",
      };
    }

    if (
      !Array.isArray(question.options) ||
      question.options.length !== 4
    ) {
      return {
        valid: false,
        error: "A quiz question must have 4 options.",
      };
    }

    if (
      !Number.isInteger(question.correctAnswer) ||
      question.correctAnswer < 0 ||
      question.correctAnswer > 3
    ) {
      return {
        valid: false,
        error: "A quiz answer is invalid.",
      };
    }
  }

  return {
    valid: true,
    data,
  };
}

export default validateStudyData;