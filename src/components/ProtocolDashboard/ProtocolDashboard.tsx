import { useState } from "react";
import { defaultProtocol } from "../../data/data";

const ProtocolDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // New state for start/stop toggle
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

  const toggleStartStop = () => {
    setIsRunning(!isRunning); // Toggle the running state
  };

  const currentGripSet = gripSets[currentIndex];

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-row justify-center text-xl font-bold">
        <h2 className="mb-3">{currentGripSet.name}</h2>
      </div>

      <div className="flex justify-center">Coming soon: Timer</div>

      <div className="flex justify-between items-center mt-5 space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`w-24 px-4 py-2 rounded-md ${
            currentIndex === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <button
          onClick={toggleStartStop}
          className={`w-24 px-4 py-2 rounded-md text-white ${
            isRunning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === gripSets.length - 1}
          className={`w-24 px-4 py-2 rounded-md ${
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

export default ProtocolDashboard;
