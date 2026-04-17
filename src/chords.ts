import {
  intervalUp,
  intervalUpPitch,
  type IntervalName,
  type PitchClass,
} from "./intervals";
import { octaveUp, type Octave, type Pitch } from "./pitch";

export type Chord = {
  chordType: ChordType;
  root: PitchClass;
  third: PitchClass;
  fifth: PitchClass;
  seventh?: PitchClass;
};

export type VoicedChord = {
  chord: Chord;
  inversion: Inversion;
  notes: Pitch[];
};

export type ChordType =
  | "major"
  | "minor"
  | "dim"
  | "dom7"
  | "halfDim7"
  | "fullDim7";

export const chordIntervalSpecs: Record<ChordType, IntervalName[]> = {
  major: ["maj3", "p5"],
  minor: ["min3", "p5"],
  dim: ["min3", "dim5"],
  dom7: ["maj3", "p5", "min7"],
  halfDim7: ["min3", "dim5", "min7"],
  fullDim7: ["min3", "dim5", "dim7"],
};

/**
 * Creates a chord of pitch classes
 * @param chordType
 * @param root
 * @returns A chord
 */
export function makeChord(chordType: ChordType, root: PitchClass): Chord {
  switch (chordType) {
    case "major":
      return {
        chordType: chordType,
        root: root,
        third: intervalUp(root, "maj3"),
        fifth: intervalUp(root, "p5"),
        seventh: undefined,
      };
    case "minor":
      return {
        chordType: chordType,
        root: root,
        third: intervalUp(root, "min3"),
        fifth: intervalUp(root, "p5"),
        seventh: undefined,
      };
    case "dom7":
      return {
        chordType: chordType,
        root: root,
        third: intervalUp(root, "maj3"),
        fifth: intervalUp(root, "p5"),
        seventh: intervalUp(root, "min7"),
      };
    case "dim":
      return {
        chordType: chordType,
        root: root,
        third: intervalUp(root, "min3"),
        fifth: intervalUp(root, "dim5"),
        seventh: undefined,
      };
    case "halfDim7":
      return {
        chordType: chordType,
        root: root,
        third: intervalUp(root, "min3"),
        fifth: intervalUp(root, "dim5"),
        seventh: intervalUp(root, "min7"),
      };
    case "fullDim7":
      return {
        chordType: chordType,
        root: root,
        third: intervalUp(root, "min3"),
        fifth: intervalUp(root, "dim5"),
        seventh: intervalUp(root, "dim7"),
      };
  }
}

export type Inversion = "root" | "first" | "second" | "third";

export function voiceChord(
  chord: Chord,
  octave: Octave,
  inversion: Inversion = "root",
): VoicedChord | undefined {
  const [thirdInt, fifthInt, seventhInt] = chordIntervalSpecs[chord.chordType];
  const root: Pitch = { pitchClass: chord.root, octave: octave };
  const third: Pitch = intervalUpPitch(root, thirdInt!);
  const fifth: Pitch = intervalUpPitch(root, fifthInt!);
  const seventh: Pitch | undefined = chord.seventh
    ? intervalUpPitch(root, seventhInt!)
    : undefined;
  return {
    chord: chord,
    inversion: inversion,
    notes: [
      inversion === "root" ? root : octaveUp(root),
      inversion === "first" ? third : octaveUp(third),
      inversion === "second" ? fifth : octaveUp(fifth),
      ...(seventh
        ? inversion === "third"
          ? [seventh]
          : [octaveUp(seventh)]
        : []),
    ],
  };
}
