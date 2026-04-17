import type { PitchClass } from "./intervals";

export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Pitch = {
  pitchClass: PitchClass;
  octave: Octave;
};
