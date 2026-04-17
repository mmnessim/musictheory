import { intervalUp, type IntervalName, type PitchClass } from "./intervals";
import type { Pitch } from "./pitch";

export type Chord = {
  chordType: ChordType;
  root: PitchClass;
  third: PitchClass;
  fifth: PitchClass;
  seventh?: PitchClass;
};

export type VoicedChord = {
  chordType: ChordType;
  root: Pitch;
  third: Pitch;
  fifth: Pitch;
  seventh?: Pitch;
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
