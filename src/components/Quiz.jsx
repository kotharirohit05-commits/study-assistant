import { useState } from "react";
import confetti from "canvas-confetti";

function celebratePerfectScore() {
  confetti({
    particleCount: 150,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.1, y: 0.7 },
  });

  confetti({
    particleCount: 150,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.9, y: 0.7 },
  });
}

function Quiz({ questions }) {
  const [quizQuestions, setQuizQuestions] = useState(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];

  const handleAnswerSelect = (optionIndex) => {
    if (answered) return;

    setSelectedAnswer(optionIndex);
    setAnswered(true);

    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((currentScore) => currentScore + 1);
    } else {
      setWrongQuestions((currentWrongQuestions) => [
        ...currentWrongQuestions,
        currentQuestion,
      ]);
    }
  };

  const handleNext = () => {
  const isLastQuestion =
    currentIndex === quizQuestions.length - 1;

  if (!isLastQuestion) {
    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
    setAnswered(false);
    return;
  }

  setQuizCompleted(true);

  if (
    score === quizQuestions.length &&
    quizQuestions.length > 0
  ) {
    celebratePerfectScore();
  }
};

  const handleRetryWrong = () => {
    setQuizQuestions(wrongQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setWrongQuestions([]);
    setQuizCompleted(false);
  };

  if (!currentQuestion) {
    return null;
  }

  if (quizCompleted) {
    return (
      <div className="mt-10 rounded-2xl bg-white p-6 text-center shadow-md">
        <h3 className="text-2xl font-bold text-gray-900">
          Quiz Complete!
        </h3>

        <p className="mt-3 text-gray-600">
          Your score: {score} / {quizQuestions.length}
        </p>

        {wrongQuestions.length > 0 ? (
          <button
            onClick={handleRetryWrong}
            className="mt-6 rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Retry Incorrect Questions
          </button>
        ) : (
          <div>
            <p className="mt-6 text-lg font-semibold text-green-600">
              Perfect score! 🎉
            </p>

            <p className="mt-2 text-gray-500">
              Amazing work!
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">
          Quiz
        </h3>

        <p className="text-sm font-medium text-gray-500">
          {currentIndex + 1} / {quizQuestions.length}
        </p>
      </div>

      <h4 className="mb-6 text-lg font-semibold text-gray-900">
        {currentQuestion.question}
      </h4>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          const isCorrect =
            index === currentQuestion.correctAnswer;

          const isSelected = index === selectedAnswer;

          let buttonClass =
            "w-full rounded-xl border border-gray-300 p-4 text-left transition hover:bg-gray-50";

          if (answered && isCorrect) {
            buttonClass =
              "w-full rounded-xl border border-green-500 bg-green-50 p-4 text-left";
          } else if (answered && isSelected && !isCorrect) {
            buttonClass =
              "w-full rounded-xl border border-red-500 bg-red-50 p-4 text-left";
          }

          return (
            <button
              key={option}
              onClick={() => handleAnswerSelect(index)}
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-6">
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <p className="font-semibold text-green-600">
              Correct! ✓
            </p>
          ) : (
            <p className="font-semibold text-red-600">
              Incorrect. The correct answer is{" "}
              {currentQuestion.options[
                currentQuestion.correctAnswer
              ]}.
            </p>
          )}
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          className="mt-6 w-full rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          {currentIndex === quizQuestions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      )}
    </div>
  );
}

export default Quiz;