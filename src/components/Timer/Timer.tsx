import { useState, useEffect } from "react";

interface TimerProps {
  totalTimeInSeconds: number;
}

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-lg font-bold">
      Timer: {seconds} second{seconds !== 1 ? "s" : ""}
    </div>
  );
};

export default Timer;
