import { useState } from "react";

function Flashcard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleFlip = () => {
    setShowAnswer((current) => !current);
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-md">
      <div className="min-h-40">
        <p className="mb-3 text-sm font-medium text-gray-500">
          {showAnswer ? "Answer" : "Question"}
        </p>

        <p className="text-xl font-semibold text-gray-900 transition-opacity duration-300">
          {showAnswer ? answer : question}
        </p>
      </div>

      <button
        onClick={handleFlip}
        className="mt-6 rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
      >
        {showAnswer ? "Show Question" : "Show Answer"}
      </button>
    </div>
  );
}

export default Flashcard;