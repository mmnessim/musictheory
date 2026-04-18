import { makeChord, secondaryDominant, type Chord } from "./chords.js";
import { intervalBetween, makeScale, type PitchClass } from "./intervals.js";
import {
  progressionToRomanNumerals,
  type Mode,
  type NumeralChords,
  type ScaleNumeral,
} from "./romanNumerals.js";

/**
 * Harmonic functional areas in common practice harmony
 */
export type FunctionalArea =
  | "tonic"
  | "tonic extension"
  | "predominant"
  | "dominant"
  | "cadence";

export type ChordProgression = {
  root: PitchClass;
  items: ProgressionItem[];
};

export type ProgressionItem = {
  chord: Chord;
  numeral: ScaleNumeral;
};

/**
 * Graph of harmonic functions
 */
export const transitions: Record<FunctionalArea, FunctionalArea[]> = {
  tonic: ["tonic extension", "predominant", "dominant"],
  "tonic extension": ["predominant"],
  predominant: ["predominant", "dominant"],
  dominant: ["cadence"],
  cadence: [],
};

/**
 *
 * @param current - current harmonic function
 * @returns - A random, but valid harmonic function based on the graph
 */
export function nextFunction(current: FunctionalArea): FunctionalArea {
  const options = transitions[current];
  if (options.length === 0) return "cadence";
  return options[Math.floor(Math.random() * options.length)]!;
}

/**
 * Generator function to recursively walk the graph and create valid functions
 *
 * @param current - Starting point of the progression
 * @param maxDepth - Prevents infinite recursion, default value of 8
 * @returns Generator that can be incremented to get progressions
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
 * Lazily loaded list of progressions. Conditionally intialized by getProgressions()
 */
let allProgressions: FunctionalArea[][] | null = null;

/**
 * Loads allProgressions if needed
 *
 * @returns all valid progressions
 */
export function getProgressions(): FunctionalArea[][] {
  if (!allProgressions) {
    allProgressions = [...walkProgressions("tonic")];
  }
  return allProgressions;
}

/**
 * Loads progressions if needed then returns one random progression
 *
 * @returns One random valid progression
 */
export function randomProgression(): FunctionalArea[] {
  const all = getProgressions();
  return all[Math.floor(Math.random() * all.length)]!;
}

/**
 * Returns a random progression of roman numerals
 * @param mode
 * @returns
 */
export function randomRomanNumeralProgression(mode: Mode): NumeralChords[] {
  const p = randomProgression();
  return progressionToRomanNumerals(p, mode);
}

/**
 * Returns a random chord progression
 * @param root
 * @param mode
 * @returns
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
