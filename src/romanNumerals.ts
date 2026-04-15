import type { ChordType } from "./chords";

export type ScaleDegree = "I" | "II" | "III" | "IV" | "V" | "VI" | "VII";

export type HarmonicFunction = {
  degree: ScaleDegree;
  chordTypes: ChordType[];
};

export const majorKeyChords: HarmonicFunction[] = [
  { degree: "I", chordTypes: ["major"] },
  { degree: "II", chordTypes: ["minor"] },
  { degree: "III", chordTypes: ["minor"] },
  { degree: "IV", chordTypes: ["major"] },
  { degree: "V", chordTypes: ["major", "dom7"] },
  { degree: "VI", chordTypes: ["minor"] },
  { degree: "VII", chordTypes: ["dim", "halfDim7"] },
];

export const natMinorKeyChords: HarmonicFunction[] = [
  { degree: "I", chordTypes: ["minor"] },
  { degree: "II", chordTypes: ["dim"] },
  { degree: "III", chordTypes: ["major"] },
  { degree: "IV", chordTypes: ["minor"] },
  { degree: "V", chordTypes: ["minor"] },
  { degree: "VI", chordTypes: ["major"] },
  { degree: "VII", chordTypes: ["major"] },
];

export const harmMinorKeyChords: HarmonicFunction[] = [
  { degree: "I", chordTypes: ["minor"] },
  { degree: "II", chordTypes: ["dim"] },
  { degree: "III", chordTypes: ["major"] },
  { degree: "IV", chordTypes: ["minor"] },
  { degree: "V", chordTypes: ["major", "dom7"] },
  { degree: "VI", chordTypes: ["major"] },
  { degree: "VII", chordTypes: ["dim", "halfDim7"] },
];
