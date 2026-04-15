/**
 * Harmonic functional areas in common practice harmony
 */
export type HarmonicFunction =
  | "tonic"
  | "tonic extension"
  | "predominant"
  | "dominant";

/**
 * Graph of harmonic functions
 */
export const transitions: Record<HarmonicFunction, HarmonicFunction[]> = {
  tonic: ["tonic", "tonic extension", "predominant", "dominant"],
  "tonic extension": ["tonic", "predominant"],
  predominant: ["predominant", "dominant"],
  dominant: ["tonic"],
};

/**
 *
 * @param current - current harmonic function
 * @returns - A random, but valid harmonic function based on the graph
 */
export function nextFunction(current: HarmonicFunction): HarmonicFunction {
  const options = transitions[current];
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
  current: HarmonicFunction = "tonic",
  maxDepth: number = 6,
): Generator<HarmonicFunction[]> {
  if (current === "dominant") {
    yield [current, "tonic"];
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
export let allProgressions: HarmonicFunction[][] | null = null;

/**
 * Loads allProgressions if needed
 *
 * @returns all valid progressions
 */
export function getProgressions(): HarmonicFunction[][] {
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
export function randomProgression(): HarmonicFunction[] {
  const all = getProgressions();
  return all[Math.floor(Math.random() * all.length)]!;
}
