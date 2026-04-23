import { makeChord, secondaryDominant, type Chord } from "./chords.js";
import { intervalBetween, makeScale, type PitchClass } from "./intervals.js";
import {
  progressionToRomanNumerals,
  type Mode,
  type NumeralChords,
  type ScaleNumeral,
} from "./romanNumerals.js";

/**
 * Harmonic functional areas in common practice harmony.
 * - tonic: Stability, resolution (I, III, VI).
 * - tonic extension: Expands the tonic area (III, VI).
 * - predominant: Leads to the dominant (II, IV, VI).
 * - dominant: Tension, leads to the tonic (V, VII).
 * - cadence: A concluding sequence.
 */
export type FunctionalArea =
  | "tonic"
  | "tonic extension"
  | "predominant"
  | "dominant"
  | "cadence";

/**
 * Represents a complete chord progression tied to a specific root key.
 */
export type ChordProgression = {
  root: PitchClass;
  items: ProgressionItem[];
};

/**
 * A single item in a chord progression.
 */
export type ProgressionItem = {
  chord: Chord;
  numeral: ScaleNumeral;
};

/**
 * State machine graph of harmonic functional transitions.
 * Defines which functional areas can follow another in common practice harmony.
 */
export const transitions: Record<FunctionalArea, FunctionalArea[]> = {
  tonic: ["tonic extension", "predominant", "dominant"],
  "tonic extension": ["predominant"],
  predominant: ["predominant", "dominant"],
  dominant: ["cadence"],
  cadence: [],
};

/**
 * Selects a random next harmonic function based on the transitions graph.
 * @param current The current harmonic function.
 * @returns A random, valid subsequent harmonic function.
 */
export function nextFunction(current: FunctionalArea): FunctionalArea {
  const options = transitions[current];
  if (options.length === 0) return "cadence";
  return options[Math.floor(Math.random() * options.length)]!;
}

/**
 * Generator function that yields valid sequences of harmonic functions by walking the transitions graph.
 * @param current Starting point of the progression.
 * @param maxDepth Prevents infinite recursion, limiting the length of the generated sequences.
 * @yields An array of FunctionalArea representing a valid harmonic progression.
 */
export function* walkProgressions(
  current: FunctionalArea = "tonic",
  maxDepth: number = 6,
): Generator<FunctionalArea[]> {
  if (current === "cadence") {
    yield [current];
    return;
  }
  if (maxDepth === 0) return;
  for (const next of transitions[current].filter((n) => n !== current)) {
    for (const rest of walkProgressions(next, maxDepth - 1)) {
      yield [current, ...rest];
    }
  }
}

/**
 * Cached list of all valid progressions generated from the transitions graph.
 */
let allProgressions: FunctionalArea[][] | null = null;

/**
 * Retrieves all valid harmonic progressions, initializing the cache if necessary.
 * @returns A 2D array of functional areas.
 */
export function getProgressions(): FunctionalArea[][] {
  if (!allProgressions) {
    allProgressions = [...walkProgressions("tonic")];
  }
  return allProgressions;
}

/**
 * Selects a random progression from the set of all valid progressions.
 * @returns A single random harmonic progression.
 */
export function randomProgression(): FunctionalArea[] {
  const all = getProgressions();
  return all[Math.floor(Math.random() * all.length)]!;
}

/**
 * Generates a random progression of roman numerals based on functional harmony.
 * @param mode The musical mode (major, natural minor, harmonic minor).
 * @returns An array of NumeralChords.
 */
export function randomRomanNumeralProgression(mode: Mode): NumeralChords[] {
  const p = randomProgression();
  return progressionToRomanNumerals(p, mode);
}

/**
 * Generates a random chord progression in a specific key and mode.
 * @param root The root pitch class of the key.
 * @param mode The musical mode.
 * @returns A complete ChordProgression object.
 */
export function randomChordProgression(
  root: PitchClass,
  mode: Mode,
): ChordProgression {
  const numerals: NumeralChords[] = randomRomanNumeralProgression(mode);
  const scale = makeScale(root, mode);
  const prog: ChordProgression = {
    root: root,
    items: [],
  };
  const noteMap: Record<ScaleNumeral, PitchClass> = {
    I: scale[0]!,
    II: scale[1]!,
    III: scale[2]!,
    IV: scale[3]!,
    V: scale[4]!,
    VI: scale[5]!,
    VII: scale[6]!,
  };
  for (const num of numerals) {
    const c = makeChord(num.chordType, noteMap[num.degree]);
    prog.items.push({
      chord: c,
      numeral: num.degree,
    });
  }
  return prog;
}

/**
 * Enhances a progression by inserting secondary dominant chords where appropriate.
 * Currently targets chords that are a major second or perfect fourth above the root.
 * @param progression An array of Chord structures.
 * @returns A new array of chords with secondary dominants inserted.
 */
export function addSecondaryDominants(progression: Chord[]): Chord[] {
  const newProgression: Chord[] = [];
  const root = progression[0]?.root;
  for (const c of progression) {
    if (intervalBetween(root!, c.root, "up") === "maj2") {
      newProgression.push(...secondaryDominant(c));
    } else if (intervalBetween(root!, c.root, "up") === "p4") {
      newProgression.push(...secondaryDominant(c));
    } else {
      newProgression.push(c);
    }
  }
  return newProgression;
}
