import { useState } from "react";

function Flashcard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleFlip = () => {
    setShowAnswer((current) => !current);
  };

  return (
    <div className="group">
      <div
        onClick={handleFlip}
        className="relative min-h-72 cursor-pointer overflow-hidden rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        {/* Question */}
        <div
          className={`absolute inset-0 flex min-h-72 flex-col justify-between p-8 transition-all duration-500 ease-out ${
            showAnswer
              ? "scale-95 opacity-0 blur-sm"
              : "scale-100 opacity-100 blur-0"
          }`}
        >
          <div>
            <p className="mb-3 text-sm font-medium text-gray-500">
              Question
            </p>

            <p className="text-xl font-semibold leading-relaxed text-gray-900">
              {question}
            </p>
          </div>

          <button
            onClick={(event) => {
              event.stopPropagation();
              handleFlip();
            }}
            className="w-fit rounded-xl bg-black px-5 py-3 font-semibold text-white transition-all duration-100 hover:scale-105 hover:bg-gray-800"
          >
            Show Answer
          </button>
        </div>

        {/* Answer */}
        <div
          className={`absolute inset-0 flex min-h-72 flex-col justify-between p-8 transition-all duration-200 ease-out ${
            showAnswer
              ? "scale-100 opacity-100 blur-0"
              : "scale-95 opacity-0 blur-sm"
          }`}
        >
          <div>
            <p className="mb-3 text-sm font-medium text-gray-500">
              Answer
            </p>

            <p className="text-lg leading-relaxed text-gray-900">
              {answer}
            </p>
          </div>

          <button
            onClick={(event) => {
              event.stopPropagation();
              handleFlip();
            }}
            className="w-fit rounded-xl bg-black px-5 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800"
          >
            Show Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;