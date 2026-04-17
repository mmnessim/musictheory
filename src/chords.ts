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
export type Position = "open" | "closed";

export function rootPositionChord(
  chord: Chord,
  octave: Octave,
  position: Position = "closed",
): VoicedChord | undefined {
  const intervals = chordIntervalSpecs[chord.chordType];
  if (!intervals) return undefined;
  const root: Pitch = { pitchClass: chord.root, octave: octave };
  let result: VoicedChord = {
    chord: chord,
    inversion: "root",
    notes: [
      root,
      intervalUpPitch(root, intervals[0]!),
      intervalUpPitch(root, intervals[1]!),
      ...(chord.seventh && intervals.length > 2
        ? [intervalUpPitch(root, intervals[2]!)]
        : []),
    ],
  };
  if (position === "open") {
    result.notes[1] = intervalUpPitch(result.notes[1]!, "octave");
  }
  return result;
}

export function firstInversionChord(
  chord: Chord,
  octave: Octave,
  position: Position = "closed",
): VoicedChord | undefined {
  const intervals = chordIntervalSpecs[chord.chordType];
  if (!intervals) return undefined;
  const root: Pitch = { pitchClass: chord.root, octave: octave };
  let result: VoicedChord = {
    chord: chord,
    inversion: "first",
    notes: [
      octaveUp(root),
      intervalUpPitch(root, intervals[0]!),
      intervalUpPitch(root, intervals[1]!),
      ...(chord.seventh && intervals.length > 2
        ? [intervalUpPitch(root, intervals[2]!)]
        : []),
    ],
  };
  if (position === "open") {
    result.notes[2] = octaveUp(result.notes[2]!);
  }
  return result;
}

export function secondInversionChord(
  chord: Chord,
  octave: Octave,
  position: Position = "closed",
): VoicedChord | undefined {
  const intervals = chordIntervalSpecs[chord.chordType];
  if (!intervals) return undefined;
  const root: Pitch = { pitchClass: chord.root, octave: octave };
  let result: VoicedChord = {
    chord: chord,
    inversion: "second",
    notes: [
      octaveUp(root),
      octaveUp(intervalUpPitch(root, intervals[0]!)),
      intervalUpPitch(root, intervals[1]!),
      ...(chord.seventh && intervals.length > 2
        ? [intervalUpPitch(root, intervals[2]!)]
        : []),
    ],
  };
  if (position === "open") {
    result.notes[1] = octaveUp(result.notes[1]!);
  }
  return result;
}
