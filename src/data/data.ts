export interface GripSet {
  name: string;
  totalReps: number;
  hangTimePerRepInSeconds: number;
  restBetweenSetsInSeconds: number;
}

export interface Protocol {
  restBetweenHangsInSeconds: number;
  gripSets: GripSet[];
}

export const defaultProtocol: Protocol = {
  restBetweenHangsInSeconds: 180,
  gripSets: [
    {
      name: "Jug",
      totalReps: 6,
      hangTimePerRepInSeconds: 10,
      restBetweenSetsInSeconds: 5,
    },
    {
      name: "IMR 2 Pad 3F Pocket",
      totalReps: 6,
      hangTimePerRepInSeconds: 10,
      restBetweenSetsInSeconds: 5,
    },
    {
      name: "Medium Edge Half Crimp",
      totalReps: 6,
      hangTimePerRepInSeconds: 10,
      restBetweenSetsInSeconds: 5,
    },
    {
      name: "MR 2 Pad 3F Pocket",
      totalReps: 6,
      hangTimePerRepInSeconds: 10,
      restBetweenSetsInSeconds: 5,
    },
    {
      name: "Large Edge Open Hand",
      totalReps: 6,
      hangTimePerRepInSeconds: 10,
      restBetweenSetsInSeconds: 5,
    },
    {
      name: "MRP 2 Pad 3F Pocket",
      totalReps: 6,
      hangTimePerRepInSeconds: 10,
      restBetweenSetsInSeconds: 5,
    },
  ],
};
