import { useRef, useState } from "react";
import FlashcardList from "./components/FlashcardList";
import Quiz from "./components/Quiz";
import validateStudyData from "./utils/validateStudyData";
import generateStudyMaterial from "./services/studyApi";

function App() {
  const [input, setInput] = useState("");
  const [studyData, setStudyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestIdRef = useRef(0);

  const handleGenerate = async () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      setError("Please enter a topic or paste your notes.");
      return;
    }

    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError("");
    setStudyData(null);

    try {
      const data = await generateStudyMaterial(trimmedInput);

      console.log("AI response:", data);

      // Ignore stale responses
      if (requestId !== requestIdRef.current) {
        return;
      }

      // Validate response before rendering
      const validationResult = validateStudyData(data);

      if (!validationResult.valid) {
        setError(validationResult.error);
        return;
      }

      setStudyData(validationResult.data);
    } catch (error) {
      console.error("Generate error:", error);

      // Ignore errors from stale requests
      if (requestId !== requestIdRef.current) {
        return;
      }

      setError(
        error.message ||
          "Unable to generate study material. Please try again."
      );
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  const handleRetry = () => {
    handleGenerate();
  };

  const handleNewTopic = () => {
    requestIdRef.current += 1;

    setStudyData(null);
    setError("");
    setInput("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Study Assistant
          </h1>

          <p className="mt-3 text-gray-600">
            Turn your notes or topics into interactive study material.
          </p>
        </div>

        {/* Input Section */}
        {!studyData && !loading && !error && (
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <label
              htmlFor="study-input"
              className="mb-3 block text-sm font-semibold text-gray-800"
            >
              What do you want to study?
            </label>

            <textarea
              id="study-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a topic or paste your notes..."
              rows={8}
              className="w-full resize-none rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition focus:border-gray-500"
            />

            <button
              onClick={handleGenerate}
              disabled={!input.trim()}
              className="mt-4 w-full rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Generate Study Material
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-md">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>

            <h2 className="text-xl font-semibold text-gray-900">
              Generating your study material...
            </h2>

            <p className="mt-2 text-gray-500">
              Please wait a moment.
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-md">
            <h2 className="text-xl font-semibold text-red-600">
              Something went wrong
            </h2>

            <p className="mt-2 text-gray-600">
              {error}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleRetry}
                className="rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Try Again
              </button>

              <button
                onClick={() => setError("")}
                className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-800 transition hover:bg-gray-100"
              >
                Edit Topic
              </button>
            </div>
          </div>
        )}

        {/* Study Material */}
        {studyData && (
          <div>
            <div className="mb-8">
  <p className="text-sm font-medium text-gray-500">
    Topic
  </p>

  <h2 className="mt-1 text-2xl font-bold text-gray-900">
    {studyData.topic}
  </h2>

  <div className="mb-8">
  <p className="text-sm font-medium text-gray-500">
    Topic
  </p>

  <h2 className="mt-1 text-2xl font-bold text-gray-900">
    {studyData.topic}
  </h2>

  <div className="mt-6 rounded-2xl bg-gray-100 p-6">
    <p className="text-sm font-semibold text-gray-700">
      Quick Summary
    </p>

    <p className="mt-2 leading-relaxed text-gray-600">
      {studyData.summary}
    </p>
  </div>
</div>
</div>

            <FlashcardList
              flashcards={studyData.flashcards}
            />

            <Quiz questions={studyData.quiz} />

            <button
              onClick={handleNewTopic}
              className="mt-8 w-full rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-800 transition hover:bg-gray-100"
            >
              Study Another Topic
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;