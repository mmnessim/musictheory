import { clampOctave, type PitchClass } from "./intervals.js";

/**
 * Valid octave range for pitches in this library.
 */
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Represents a specific pitch with a pitch class and an octave.
 */
export type Pitch = {
  /** The pitch class (e.g., "C", "F#") */
  pitchClass: PitchClass;
  /** The octave (0-7) */
  octave: Octave;
};

/**
 * Increments the octave of a pitch, clamped at a maximum of 7.
 * @param pitch The pitch to modify.
 * @returns A new Pitch object one octave higher.
 */
export function octaveUp(pitch: Pitch): Pitch {
  return {
    pitchClass: pitch.pitchClass,
    octave: clampOctave(pitch.octave + 1),
  };
}

/**
 * Decrements the octave of a pitch, clamped at a minimum of 0.
 * @param pitch The pitch to modify.
 * @returns A new Pitch object one octave lower.
 */
export function octaveDown(pitch: Pitch): Pitch {
  return {
    pitchClass: pitch.pitchClass,
    octave: clampOctave(pitch.octave - 1),
  };
}
