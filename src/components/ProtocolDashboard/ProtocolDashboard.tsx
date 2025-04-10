import { useState } from "react";
import { defaultProtocol } from "../../data/data";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

const ProtocolDashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [gripSetIndex, setGripSetIndex] = useState(0);
  const [repIndex, setRepIndex] = useState(0);
  const gripSets = defaultProtocol.gripSets;

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const incrementGripSet = () => {
    if (gripSetIndex < gripSets.length - 1) {
      setGripSetIndex(gripSetIndex + 1);
      setRepIndex(0);
    }
  };

  const decrementGripSet = () => {
    if (gripSetIndex > 0) {
      setGripSetIndex(gripSetIndex - 1);
      setRepIndex(0);
    }
  };

  const incrementRep = () => {
    if (repIndex < gripSets[gripSetIndex].totalReps - 1) {
      setRepIndex(repIndex + 1);
    } else {
      incrementGripSet();
      setRepIndex(0);
    }
  };

  const decrementRep = () => {
    if (repIndex > 0) {
      setRepIndex(repIndex - 1);
    } else {
      decrementGripSet();
      setRepIndex(gripSets[gripSetIndex].totalReps - 1);
    }
  };

  const currentGripSet = gripSets[gripSetIndex];

  return (
    <div>
      <div className="flex flex-col justify-between h-full space-y-10">
        <div className="flex flex-row justify-center text-3xl font-bold">
          <h2 className="mb-3 w-64 h-12 text-center break-words">
            {currentGripSet.name}
          </h2>
        </div>

        <div className="flex justify-center text-2xl">
          <span>##:##:##</span>
        </div>

        <div className="flex flex-row justify-center space-x-10">
          <div className="flex flex-col items-center text-xl">
            <span>Rep</span>
            <span>
              {repIndex + 1}/{currentGripSet.totalReps}
            </span>
          </div>
          <div className="flex flex-col items-center  text-xl">
            <span>Sets</span>
            <span>
              {gripSetIndex + 1}/{gripSets.length}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5 space-x-2">
        <button
          onClick={decrementGripSet}
          disabled={gripSetIndex <= 0}
          className={`p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
            gripSetIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronFirst />
        </button>
        <button
          onClick={decrementRep}
          disabled={repIndex <= 0 && gripSetIndex <= 0}
          className={`p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 
            ${
              repIndex <= 0 && gripSetIndex <= 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
        >
          <ChevronLeft />
        </button>
        <button
          className="p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleStartStop}
        >
          {isRunning ? <Pause /> : <Play />}
        </button>
        <button
          onClick={incrementRep}
          disabled={
            gripSetIndex >= gripSets.length - 1 &&
            repIndex >= gripSets[gripSetIndex].totalReps - 1
          }
          className={`p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
            gripSetIndex >= gripSets.length - 1 &&
            repIndex >= gripSets[gripSetIndex].totalReps - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <ChevronRight />
        </button>
        <button
          onClick={incrementGripSet}
          disabled={gripSetIndex >= gripSets.length - 1}
          className={`p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
            gripSetIndex >= gripSets.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <ChevronLast />
        </button>
      </div>
    </div>
  );
};

export default ProtocolDashboard;
