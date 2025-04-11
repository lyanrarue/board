import { Protocol } from "../data/data";

type EventType = "Hang" | "Rest" | "Get Ready";

interface Event {
  type: EventType;
  durationInSeconds: number;
  currentRep: number;
}

interface Segment {
  events: Event[];
  name: string;
  totalReps: number;
}

export const generateSegments = (protocol: Protocol): Segment[] => {
  const segments: Segment[] = [];
  protocol.sets.forEach((set, index) => {
    const eventsInSegment: Event[] = [];
    eventsInSegment.push({
      type: "Get Ready",
      durationInSeconds: 10,
      currentRep: 1,
    });

    for (let i = 0; i < set.totalReps; i++) {
      eventsInSegment.push({
        type: "Hang",
        durationInSeconds: set.timePerRepInSeconds,
        currentRep: i + 1,
      });

      if (isNotLastRep(i, set.totalReps)) {
        eventsInSegment.push({
          type: "Rest",
          durationInSeconds: set.restBetweenRepsInSeconds,
          currentRep: i + 1,
        });
      }
    }

    if (isNotLastSet(index, protocol.sets.length)) {
      eventsInSegment.push({
        type: "Rest",
        durationInSeconds: protocol.restBetweenSetsInSeconds,
        currentRep: set.totalReps,
      });
    }

    segments.push({
      events: eventsInSegment,
      name: set.name,
      totalReps: set.totalReps,
    });
  });

  return segments;
};

const isNotLastRep = (index: number, totalReps: number) =>
  index < totalReps - 1;

const isNotLastSet = (index: number, totalSets: number) =>
  index < totalSets - 1;
