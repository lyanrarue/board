export interface Set {
  name: string;
  totalReps: number;
  timePerRepInSeconds: number;
  restBetweenRepsInSeconds: number;
}

export interface Protocol {
  restBetweenSetsInSeconds: number;
  sets: Set[];
}

export const defaultProtocol: Protocol = {
  restBetweenSetsInSeconds: 180,
  sets: [
    {
      name: "Jug",
      totalReps: 6,
      timePerRepInSeconds: 10,
      restBetweenRepsInSeconds: 5,
    },
    {
      name: "IMR 2 Pad 3F Pocket",
      totalReps: 6,
      timePerRepInSeconds: 10,
      restBetweenRepsInSeconds: 5,
    },
    {
      name: "Medium Edge Half Crimp",
      totalReps: 6,
      timePerRepInSeconds: 10,
      restBetweenRepsInSeconds: 5,
    },
    {
      name: "MR 2 Pad 3F Pocket",
      totalReps: 6,
      timePerRepInSeconds: 10,
      restBetweenRepsInSeconds: 5,
    },
    {
      name: "Large Edge Open Hand",
      totalReps: 6,
      timePerRepInSeconds: 10,
      restBetweenRepsInSeconds: 5,
    },
    {
      name: "MRP 2 Pad 3F Pocket",
      totalReps: 6,
      timePerRepInSeconds: 10,
      restBetweenRepsInSeconds: 5,
    },
  ],
};
