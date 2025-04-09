import { useState } from "react";
import { defaultProtocol } from "../../data/data";

const GripSetViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gripSets = defaultProtocol.gripSets;

  const handleNext = () => {
    if (currentIndex < gripSets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentGripSet = gripSets[currentIndex];

  return (
    <div className="p-10 w-60 rounded-lg shadow-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h2 className="text-l font-bold mb-2">{currentGripSet.name}</h2>
      <p>Total Reps: {currentGripSet.totalReps}</p>
      <p>Hang Time Per Rep: {currentGripSet.hangTimePerRepInSeconds} seconds</p>
      <p>
        Rest Between Sets: {currentGripSet.restBetweenSetsInSeconds} seconds
      </p>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-md ${
            currentIndex === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === gripSets.length - 1}
          className={`px-4 py-2 rounded-md ${
            currentIndex === gripSets.length - 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GripSetViewer;
