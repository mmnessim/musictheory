import { clampOctave, type PitchClass } from "./intervals";

export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Pitch = {
  pitchClass: PitchClass;
  octave: Octave;
};

/**
 * Bumps up one octave, clamped at 7
 * @param pitch
 * @returns
 */
export function octaveUp(pitch: Pitch): Pitch {
  return {
    pitchClass: pitch.pitchClass,
    octave: clampOctave(pitch.octave + 1),
  };
}

/**
 * Bumps down one octave, clamped at 0
 * @param pitch
 * @returns
 */
export function octaveDown(pitch: Pitch): Pitch {
  return {
    pitchClass: pitch.pitchClass,
    octave: clampOctave(pitch.octave - 1),
  };
}
