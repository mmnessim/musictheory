import {
  intervalUp,
  intervalUpPitch,
  type IntervalName,
  type PitchClass,
} from "./intervals.js";
import { octaveUp, type Octave, type Pitch } from "./pitch.js";

/**
 * Represents a basic chord structure without specific voicing.
 */
export type Chord = {
  chordType: ChordType;
  root: PitchClass;
  third: PitchClass;
  fifth: PitchClass;
  seventh?: PitchClass;
};

/**
 * Represents a voiced chord with specific pitches and an inversion.
 */
export type VoicedChord = {
  chord: Chord;
  inversion: Inversion;
  notes: Pitch[];
};

/**
 * Supported chord qualities.
 */
export type ChordType =
  | "major"
  | "minor"
  | "dim"
  | "dom7"
  | "halfDim7"
  | "fullDim7";

/**
 * Mapping of chord types to their constituent intervals relative to the root.
 */
export const chordIntervalSpecs: Record<ChordType, IntervalName[]> = {
  major: ["maj3", "p5"],
  minor: ["min3", "p5"],
  dim: ["min3", "dim5"],
  dom7: ["maj3", "p5", "min7"],
  halfDim7: ["min3", "dim5", "min7"],
  fullDim7: ["min3", "dim5", "dim7"],
};

/**
 * Creates a chord structure based on a root pitch class and a chord type.
 * @param chordType The quality of the chord.
 * @param root The root note of the chord.
 * @returns A Chord object containing the calculated pitch classes.
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

/**
 * Generates a secondary dominant chord sequence for a given chord.
 * @param chord The target chord.
 * @returns An array containing the secondary dominant (V7 of the target) followed by the target chord itself.
 * Returns only the original chord if it is diminished.
 */
export function secondaryDominant(chord: Chord): Chord[] {
  if (["dim", "halfDim7", "fullDim7"].includes(chord.chordType)) return [chord];
  const root = intervalUp(chord.root, "p5");
  return [makeChord("dom7", root), chord];
}

/**
 * Chord inversions.
 * - root: Root in the bass.
 * - first: Third in the bass.
 * - second: Fifth in the bass.
 * - third: Seventh in the bass (only for seventh chords).
 */
export type Inversion = "root" | "first" | "second" | "third";

/**
 * Applies a specific voicing (octave and inversion) to a chord structure.
 * @param chord The chord to voice.
 * @param octave The starting octave for the root note.
 * @param inversion The desired inversion.
 * @returns A VoicedChord object if the inversion is valid for the chord type, otherwise undefined.
 */
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
