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
  const [isRunning, setIsRunning] = useState(false); // New state for start/stop toggle
  const gripSets = defaultProtocol.gripSets;

  const toggleStartStop = () => {
    setIsRunning(!isRunning); // Toggle the running state
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-row justify-center text-xl font-bold">
        <h2 className="mb-3">Current Grip Set</h2>
      </div>

      <div className="flex justify-center">Timer</div>

      <div className="flex justify-center">Rep Information</div>

      <div className="flex justify-between items-center mt-5 space-x-2">
        <button className="p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronFirst />
        </button>
        <button className="p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronLeft />
        </button>
        <button
          className="p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleStartStop}
        >
          {isRunning ? <Pause /> : <Play />}
        </button>
        <button className="p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronRight />
        </button>
        <button className="p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronLast />
        </button>
      </div>
    </div>
  );
};

export default ProtocolDashboard;
