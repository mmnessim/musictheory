import {
  intervalUp,
  intervalUpPitch,
  type IntervalName,
  type PitchClass,
} from "./intervals.js";
import { octaveUp, type Octave, type Pitch } from "./pitch.js";

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

export function secondaryDominant(chord: Chord): Chord[] {
  if (["dim", "halfDim7", "fullDim7"].includes(chord.chordType)) return [chord];
  const root = intervalUp(chord.root, "p5");
  return [makeChord("dom7", root), chord];
}

/**
 * Chord inversions.
 *
 * Root position is root in bass
 * First inversion is third in bass
 * Second inversion is fifth in bass
 * Third inversion is only possible for seventh chords and has the seventh in bass
 */
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
  switch (inversion) {
    case "root":
      return {
        chord: chord,
        inversion: inversion,
        notes: [root, third, fifth, ...(seventh ? [seventh] : [])],
      };
    case "first":
      return {
        chord: chord,
        inversion: inversion,
        notes: [third, fifth, ...(seventh ? [seventh] : []), octaveUp(root)],
      };
    case "second":
      return {
        chord: chord,
        inversion: inversion,
        notes: [
          fifth,
          ...(seventh ? [seventh] : []),
          octaveUp(root),
          octaveUp(third),
        ],
      };
    case "third":
      if (!seventh) {
        return undefined;
      }
      return {
        chord: chord,
        inversion: inversion,
        notes: [seventh, octaveUp(root), octaveUp(third), octaveUp(fifth)],
      };
  }
}
