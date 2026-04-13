/** All chromatic pitch classes excluding double sharps and double flats */
export type PitchClass =
  | "Cb"
  | "C"
  | "C#"
  | "Db"
  | "D"
  | "D#"
  | "Eb"
  | "E"
  | "E#"
  | "Fb"
  | "F"
  | "F#"
  | "Gb"
  | "G"
  | "G#"
  | "Ab"
  | "A"
  | "A#"
  | "Bb"
  | "B"
  | "B#";

/** All standard interval names excluding most augmented and diminished intervals */
export type IntervalName =
  | "unison"
  | "min2"
  | "maj2"
  | "min3"
  | "maj3"
  | "p4"
  | "aug4"
  | "dim5"
  | "p5"
  | "maj6"
  | "min7"
  | "maj7";

/** The chromatic position (semitones starting at 0) and letter position of each note */
export type Note = {
  /** Chromatic position 0-11, C = 0 */
  semitone: number;
  /** Letter position 0-6, C = 0 */
  letter: number;
};

/** The number of semitones and letters to increment or decrement for a given interval */
export interface IntervalSpec {
  steps: number;
  letterSteps: number;
}

/**
 * Table of pitch classes and corresponding notes
 *
 * @example
 * noteSpecs['C'] // => { semitone: 0, letter: 0 }
 */
export const noteSpecs: Record<PitchClass, Note> = {
  Cb: {
    semitone: 11,
    letter: 0,
  },
  C: {
    semitone: 0,
    letter: 0,
  },
  "C#": {
    semitone: 1,
    letter: 0,
  },
  Db: {
    semitone: 1,
    letter: 1,
  },
  D: {
    semitone: 2,
    letter: 1,
  },
  "D#": {
    semitone: 3,
    letter: 1,
  },
  Eb: {
    semitone: 3,
    letter: 2,
  },
  E: {
    semitone: 4,
    letter: 2,
  },
  "E#": {
    semitone: 5,
    letter: 2,
  },
  Fb: {
    semitone: 4,
    letter: 3,
  },
  F: {
    semitone: 5,
    letter: 3,
  },
  "F#": {
    semitone: 6,
    letter: 3,
  },
  Gb: {
    semitone: 6,
    letter: 4,
  },
  G: {
    semitone: 7,
    letter: 4,
  },
  "G#": {
    semitone: 8,
    letter: 4,
  },
  Ab: {
    semitone: 8,
    letter: 5,
  },
  A: {
    semitone: 9,
    letter: 5,
  },
  "A#": {
    semitone: 10,
    letter: 5,
  },
  Bb: {
    semitone: 10,
    letter: 6,
  },
  B: {
    semitone: 11,
    letter: 6,
  },
  "B#": {
    semitone: 0,
    letter: 6,
  },
};

/**
 * Table of steps and letter steps for each interval
 */
export const intervalSpecs: Record<IntervalName, IntervalSpec> = {
  unison: { steps: 0, letterSteps: 0 },
  min2: { steps: 1, letterSteps: 1 },
  maj2: { steps: 2, letterSteps: 1 },
  min3: { steps: 3, letterSteps: 2 },
  maj3: { steps: 4, letterSteps: 2 },
  p4: { steps: 5, letterSteps: 3 },
  aug4: { steps: 6, letterSteps: 3 },
  dim5: { steps: 6, letterSteps: 4 },
  p5: { steps: 7, letterSteps: 4 },
  maj6: { steps: 9, letterSteps: 5 },
  min7: { steps: 10, letterSteps: 6 },
  maj7: { steps: 11, letterSteps: 6 },
};

/**
 * Computes the pitch class a given interval above a starting note.
 * Uses dual semitone/letter constraint for enharmonic correctness.
 *
 * @param start - the starting pitch class
 * @param interval - the interval to transpose up by
 * @returns the resulting pitch class
 *
 * @example
 * intervalUp('C', 'maj3') // => 'E'
 * intervalUp('E', 'maj3') // => 'G#'
 */
export function intervalUp(
  start: PitchClass,
  interval: IntervalName,
): PitchClass {
  const end = {
    semitone: (noteSpecs[start].semitone + intervalSpecs[interval].steps) % 12,
    letter: (noteSpecs[start].letter + intervalSpecs[interval].letterSteps) % 7,
  };
  const result = (Object.entries(noteSpecs) as [PitchClass, Note][]).find(
    ([_, note]) => note.semitone === end.semitone && note.letter === end.letter,
  );
  if (!result)
    throw new Error(`No pitch class found for ${JSON.stringify(end)}`);
  return result[0];
}
