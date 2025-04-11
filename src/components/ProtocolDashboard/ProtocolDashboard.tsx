import { useEffect, useState } from "react";
import { defaultProtocol } from "../../data/data";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { timer } from "../../utils/timer";
import { generateSegments } from "../../utils/sequencer";

const ProtocolDashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const sequence = generateSegments(defaultProtocol);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(
    sequence[0].events[0].durationInSeconds
  );

  const currentSegment = sequence[currentSegmentIndex];
  const currentEvent = currentSegment.events[currentEventIndex];

  const isFirstEventInSegment = () => currentEventIndex === 0;
  const isLastEventInSegment = () =>
    currentEventIndex === currentSegment.events.length - 1;
  const isLastSegment = () => currentSegmentIndex === sequence.length - 1;
  const isFirstSegment = () => currentSegmentIndex === 0;
  const isLastEventInSequence = () => isLastEventInSegment() && isLastSegment();
  const isFirstEventInSequence = () =>
    isFirstEventInSegment() && isFirstSegment();

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const incrementEventIndex = (pause?: boolean) => {
    if (pause) {
      setIsRunning(false);
    }

    if (isLastEventInSegment()) {
      incremementSegmentIndex();
      setCurrentEventIndex(0);
    } else {
      setCurrentEventIndex(currentEventIndex + 1);
    }
  };

  const decrementEventIndex = () => {
    setIsRunning(false);
    if (isFirstEventInSegment()) {
      decrementSegmentIndex();
      setCurrentEventIndex(currentSegment.events.length - 1);
    } else {
      setCurrentEventIndex(currentEventIndex - 1);
    }
  };

  const incremementSegmentIndex = () => {
    setIsRunning(false);
    setCurrentSegmentIndex(currentSegmentIndex + 1);
    setCurrentEventIndex(0);
  };

  const decrementSegmentIndex = () => {
    setIsRunning(false);
    setCurrentSegmentIndex(currentSegmentIndex - 1);
    setCurrentEventIndex(0);
  };

  useEffect(() => {
    let cancelTimer: (() => void) | undefined;

    if (isRunning && remainingTime > 0) {
      cancelTimer = timer(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            incrementEventIndex();
            return 0;
          }
          return prev - 1;
        });
      }, 1000).cancel;
    }

    return () => {
      if (cancelTimer) cancelTimer();
    };
  }, [isRunning, remainingTime]);

  useEffect(() => {
    setRemainingTime(currentEvent.durationInSeconds);
  }, [currentEventIndex]);

  console.log(currentEvent.durationInSeconds);

  return (
    <div>
      <div className="flex flex-col justify-between h-full space-y-10">
        <div className="flex flex-row justify-center text-3xl font-bold">
          <h2 className="mb-3 w-50 h-10 text-center break-words">
            {currentSegment.name}
          </h2>
        </div>

        <div className="flex justify-center text-2xl">
          <span>{currentEvent.type}</span>
        </div>

        <div className="flex justify-center text-2xl">
          <span>{remainingTime}s</span>
        </div>

        <div className="flex flex-row justify-center space-x-10">
          <div className="flex flex-col items-center text-xl">
            <span>Rep</span>
            <span>
              {currentEvent.currentRep}/{currentSegment.totalReps}
            </span>
          </div>
          <div className="flex flex-col items-center  text-xl">
            <span>Sets</span>
            <span>
              {currentSegmentIndex + 1}/{sequence.length}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5 space-x-2">
        <button
          onClick={decrementSegmentIndex}
          disabled={isFirstSegment()}
          className={`p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isFirstSegment() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronFirst />
        </button>
        <button
          onClick={decrementEventIndex}
          disabled={isFirstEventInSequence()}
          className={`p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 
            ${isFirstEventInSequence() ? "opacity-50 cursor-not-allowed" : ""}`}
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
          onClick={incrementEventIndex}
          disabled={isLastEventInSequence()}
          className={`p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isLastEventInSequence() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronRight />
        </button>
        <button
          onClick={incremementSegmentIndex}
          disabled={isLastSegment()}
          className={`p-2 rounded-md hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isLastSegment() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLast />
        </button>
      </div>
    </div>
  );
};

export default ProtocolDashboard;
