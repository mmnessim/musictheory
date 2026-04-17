import type { Octave, Pitch } from "./pitch";

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
  | "B#"
  // Double flats
  | "Cbb"
  | "Dbb"
  | "Ebb"
  | "Fbb"
  | "Gbb"
  | "Abb"
  | "Bbb"
  // Double sharps
  | "Cx"
  | "Dx"
  | "Ex"
  | "Fx"
  | "Gx"
  | "Ax"
  | "Bx";

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
  | "min6"
  | "maj6"
  | "dim7"
  | "min7"
  | "maj7"
  | "octave";

/** The chromatic position (semitones starting at 0) and letter position of each note */
export type Note = {
  /** Chromatic position 0-11, C = 0 */
  semitone: number;
  /** Letter position 0-6, C = 0 */
  letter: number;
};

/** The number of semitones and letters to increment or decrement for a given interval */
export interface IntervalSpec {
  /** Semitone distance (half steps) */
  steps: number;
  /** Diatonic letter distance (number of letter names spanned, e.g. C→E = 2) */
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
  Cbb: {
    semitone: 10,
    letter: 0,
  },
  Dbb: {
    semitone: 0,
    letter: 1,
  },
  Ebb: {
    semitone: 2,
    letter: 2,
  },
  Fbb: {
    semitone: 3,
    letter: 3,
  },
  Gbb: {
    semitone: 5,
    letter: 4,
  },
  Abb: {
    semitone: 7,
    letter: 5,
  },
  Bbb: {
    semitone: 9,
    letter: 6,
  },
  Cx: {
    semitone: 2,
    letter: 0,
  },
  Dx: {
    semitone: 4,
    letter: 1,
  },
  Ex: {
    semitone: 6,
    letter: 2,
  },
  Fx: {
    semitone: 7,
    letter: 3,
  },
  Gx: {
    semitone: 9,
    letter: 4,
  },
  Ax: {
    semitone: 11,
    letter: 5,
  },
  Bx: {
    semitone: 1,
    letter: 6,
  },
};

/**
 * Reverse lookup map from `"semitone,letter"` key to pitch class.
 * Used by `intervalUp`/`intervalDown` to resolve the target note
 * after applying semitone and letter offsets.
 *
 * @example
 * notesByPosition.get('0,0') // => 'C'
 * notesByPosition.get('1,0') // => 'C#'
 */
export const notesByPosition: Map<string, PitchClass> = new Map(
  (Object.entries(noteSpecs) as [PitchClass, Note][]).map(([pc, note]) => [
    `${note.semitone},${note.letter}`,
    pc,
  ]),
);

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
  min6: { steps: 8, letterSteps: 5 },
  maj6: { steps: 9, letterSteps: 5 },
  dim7: { steps: 9, letterSteps: 6 },
  min7: { steps: 10, letterSteps: 6 },
  maj7: { steps: 11, letterSteps: 6 },
  octave: { steps: 12, letterSteps: 7 },
};

export const intervalsByPosition: Map<string, IntervalName> = new Map(
  (Object.entries(intervalSpecs) as [IntervalName, IntervalSpec][]).map(
    ([name, spec]) => [`${spec.steps},${spec.letterSteps}`, name],
  ),
);

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
  const result = notesByPosition.get(`${end.semitone},${end.letter}`);
  if (!result)
    throw new Error(`No pitch class found for ${JSON.stringify(end)}`);
  return result;
}

export function intervalUpPitch(start: Pitch, interval: IntervalName): Pitch {
  const startNote = noteSpecs[start.pitchClass];
  const end = intervalUp(start.pitchClass, interval);
  const endNote = noteSpecs[end];
  const spec = intervalSpecs[interval];
  const octavesUp = Math.floor(spec.letterSteps / 7);
  const wrapped = endNote.letter < startNote.letter ? 1 : 0;
  return {
    pitchClass: end,
    octave: clampOctave(start.octave + octavesUp + wrapped),
  };
}

export function intervalDownPitch(start: Pitch, interval: IntervalName): Pitch {
  const startNote = noteSpecs[start.pitchClass];
  const end = intervalDown(start.pitchClass, interval);
  const endNote = noteSpecs[end];
  const spec = intervalSpecs[interval];
  const octavesDown = Math.floor(spec.letterSteps / 7);
  const wrapped = endNote.letter > startNote.letter ? 1 : 0;
  return {
    pitchClass: end,
    octave: clampOctave(start.octave - octavesDown - wrapped),
  };
}

export const clampOctave = (n: number): Octave =>
  Math.min(7, Math.max(0, n)) as Octave;

/**
 * Computes the pitch class a given interval below a starting note.
 * Uses dual semitone/letter constraint for enharmonic correctness.
 *
 * @param start - the starting pitch class
 * @param interval - the interval to transpose down by
 * @returns the resulting pitch class
 *
 * @example
 * intervalDown('E', 'maj3') // => 'C'
 * intervalDown('G#', 'maj3') // => 'E'
 */
export function intervalDown(
  start: PitchClass,
  interval: IntervalName,
): PitchClass {
  const end = {
    semitone:
      (noteSpecs[start].semitone - intervalSpecs[interval].steps + 12) % 12,
    letter:
      (noteSpecs[start].letter - intervalSpecs[interval].letterSteps + 7) % 7,
  };
  const result = notesByPosition.get(`${end.semitone},${end.letter}`);

  if (!result)
    throw new Error(`No pitch class found for ${JSON.stringify(end)}`);
  return result;
}

export type IntervalDirection = "up" | "down";

export function intervalBetween(
  start: PitchClass,
  end: PitchClass,
  direction: IntervalDirection = "up",
): IntervalName | undefined {
  const steps =
    direction === "up"
      ? (noteSpecs[end].semitone - noteSpecs[start].semitone + 12) % 12
      : (noteSpecs[start].semitone - noteSpecs[end].semitone + 12) % 12;
  const letterSteps =
    direction === "up"
      ? (noteSpecs[end].letter - noteSpecs[start].letter + 7) % 7
      : (noteSpecs[start].letter - noteSpecs[end].letter + 7) % 7;
  return intervalsByPosition.get(`${steps},${letterSteps}`);
}
