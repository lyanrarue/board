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

  const onIncremementIndexButtonClick = () => incrementEventIndex(true);

  const incrementEventIndex = (pause: boolean) => {
    let eventIndexToUse;
    if (isLastEventInSegment()) {
      eventIndexToUse = 0;
      incremementSegmentIndex();
      setCurrentEventIndex(0);
    } else {
      eventIndexToUse = currentEventIndex + 1;
      setCurrentEventIndex(eventIndexToUse);
    }

    timer.stop();
    timer.start({
      countdown: true,
      startValues: {
        seconds: currentSegment.events[eventIndexToUse]?.durationInSeconds || 0,
      },
    });

    if (pause) {
      timer.pause();
      setIsRunning(false);
    }
  };

  const decrementEventIndex = () => {
    let eventIndexToUse;
    if (isFirstEventInSegment()) {
      eventIndexToUse = currentSegment.events.length - 1;
      decrementSegmentIndex();
      setCurrentEventIndex(eventIndexToUse);
    } else {
      eventIndexToUse = currentEventIndex - 1;
      setCurrentEventIndex(eventIndexToUse);
    }

    timer.stop();
    timer.start({
      countdown: true,
      startValues: {
        seconds: currentSegment.events[eventIndexToUse]?.durationInSeconds || 0,
      },
    });
    timer.pause();
    setIsRunning(false);
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
    timer.pause();
    setIsRunning(false);
  };

  const decrementSegmentIndex = () => {
    setCurrentSegmentIndex(currentSegmentIndex - 1);
    setCurrentEventIndex(0);
    timer.stop();
    timer.start({
      countdown: true,
      startValues: {
        seconds:
          sequence[currentSegmentIndex - 1]?.events[0]?.durationInSeconds || 0,
      },
    });
    timer.pause();
    setIsRunning(false);
  };

  const [timer, isTargetAchieved] = useTimer({
    precision: "secondTenths",
    countdown: true,
    startValues: { seconds: currentEvent.durationInSeconds },
    updateWhenTargetAchieved: true,
  });

  useEffect(() => {
    if (isTargetAchieved && !isLastEventInSequence()) {
      if (isLastEventInSegment()) {
        incremementSegmentIndex();
      } else {
        incrementEventIndex(false);
      }
    }
  }, [isTargetAchieved]);

  return (
    <div>
      <div className="flex flex-col justify-between h-full space-y-16">
        <div className="flex flex-row justify-center text-4xl font-bold">
          <h2 className="mb-5 w-75 h-14 text-center break-words">
            {currentSegment.name}
          </h2>
        </div>

        <div className="flex justify-center text-4xl">
          <span>{currentEvent.type}</span>
        </div>

        <div className="flex justify-center text-4xl">
          <span>
            {timer
              .getTimeValues()
              .toString(["minutes", "seconds", "secondTenths"])}
          </span>
        </div>

        <div className="flex flex-row justify-center space-x-16">
          <div className="flex flex-col items-center text-3xl">
            <span>Rep</span>
            <span>
              {currentEvent.currentRep}/{currentSegment.totalReps}
            </span>
          </div>
          <div className="flex flex-col items-center  text-3xl">
            <span>Sets</span>
            <span>
              {currentSegmentIndex + 1}/{sequence.length}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10 space-x-4">
        <button
          onClick={decrementSegmentIndex}
          disabled={isFirstSegment()}
          className={`p-4 rounded-lg hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isFirstSegment() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronFirst size={30} />
        </button>
        <button
          onClick={decrementEventIndex}
          disabled={isFirstEventInSequence()}
          className={`p-2 rounded-lg hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 
            ${isFirstEventInSequence() ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ChevronLeft size={30} />
        </button>
        <button
          className="p-2 rounded-lg hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleStartStop}
        >
          {isRunning ? <Pause size={40} /> : <Play size={40} />}
        </button>
        <button
          onClick={onIncremementIndexButtonClick}
          disabled={isLastEventInSequence()}
          className={`p-2 rounded-lg hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isLastEventInSequence() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronRight size={30} />
        </button>
        <button
          onClick={incremementSegmentIndex}
          disabled={isLastSegment()}
          className={`p-2 rounded-lg hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isLastSegment() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLast size={30} />
        </button>
      </div>
    </div>
  );
};

export default ProtocolDashboard;
