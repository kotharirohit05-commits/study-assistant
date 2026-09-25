import { useState } from "react";
import Flashcard from "./Flashcard";

function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCard = flashcards[currentIndex];

  const progress =
    ((currentIndex + 1) / flashcards.length) * 100;

  const handlePrevious = () => {
    setCurrentIndex((index) => index - 1);
  };

  const handleNext = () => {
    setCurrentIndex((index) => index + 1);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">
          Flashcards
        </h3>

        <p className="text-sm font-medium text-gray-500">
          {currentIndex + 1} / {flashcards.length}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-black transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Flashcard
        key={currentIndex}
        question={currentCard.question}
        answer={currentCard.answer}
      />

      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-800 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className="rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FlashcardList;