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
import { generateSegments } from "../../utils/sequencer";
import useTimer from "easytimer-react-hook";

const ProtocolDashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const sequence = generateSegments(defaultProtocol);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

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
    setIsRunning((prev) => {
      if (!prev) {
        timer.start({
          countdown: true,
          startValues: { seconds: currentEvent.durationInSeconds },
        });
      } else {
        timer.pause();
      }
      return !prev;
    });
  };

  const incrementEventIndex = () => {
    if (isLastEventInSegment()) {
      incremementSegmentIndex();
      setCurrentEventIndex(0);
    } else {
      setCurrentEventIndex(currentEventIndex + 1);
    }
    timer.stop();
    timer.start({
      countdown: true,
      startValues: {
        seconds:
          currentSegment.events[currentEventIndex + 1]?.durationInSeconds || 0,
      },
    });
  };

  const decrementEventIndex = () => {
    if (isFirstEventInSegment()) {
      decrementSegmentIndex();
      setCurrentEventIndex(currentSegment.events.length - 1);
    } else {
      setCurrentEventIndex(currentEventIndex - 1);
    }
    timer.stop();
    timer.start({
      countdown: true,
      startValues: {
        seconds:
          currentSegment.events[currentEventIndex - 1]?.durationInSeconds || 0,
      },
    });
  };

  const incremementSegmentIndex = () => {
    setCurrentSegmentIndex(currentSegmentIndex + 1);
    setCurrentEventIndex(0);
    timer.stop();
    timer.start({
      countdown: true,
      startValues: {
        seconds:
          sequence[currentSegmentIndex + 1]?.events[0]?.durationInSeconds || 0,
      },
    });
  };

  const decrementSegmentIndex = () => {
    setCurrentSegmentIndex(currentSegmentIndex - 1);
    setCurrentEventIndex(0);
    timer.pause();
    timer.start({
      countdown: true,
      startValues: {
        seconds:
          sequence[currentSegmentIndex - 1]?.events[0]?.durationInSeconds || 0,
      },
    });
  };

  const [timer, isTargetAchieved] = useTimer({
    precision: "secondTenths",
    countdown: true,
    startValues: { seconds: currentEvent.durationInSeconds },
    updateWhenTargetAchieved: true,
  });

  useEffect(() => {
    if (isTargetAchieved) {
      incrementEventIndex();
    }
  }, [isTargetAchieved]);

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
          <span>
            {timer
              .getTimeValues()
              .toString(["minutes", "seconds", "secondTenths"])}
          </span>
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
