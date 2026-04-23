import { intervalDown, intervalUp, type PitchClass } from "./intervals";
import type { Mode } from "./romanNumerals";

export const SharpsOrder: PitchClass[] = [
  "F#",
  "C#",
  "G#",
  "D#",
  "A#",
  "E#",
  "B#",
];

export const FlatsOrder: PitchClass[] = [
  "Bb",
  "Eb",
  "Ab",
  "Db",
  "Gb",
  "Cb",
  "Fb",
];

export type AccidentalCount = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type AccidentalType = "sharp" | "flat";

export type KeySignature = {
  root: PitchClass;
  mode: Mode;
  accidentalCount: AccidentalCount;
  accidentalType: AccidentalType;
};

export function getKeyFromSignature(
  count: AccidentalCount,
  type: AccidentalType,
  mode: Mode,
): KeySignature {
  let base: PitchClass = "C";

  for (let i = 0; i < count; i++) {
    base = type === "sharp" ? intervalUp(base, "p5") : intervalDown(base, "p5");
  }
  switch (mode) {
    case "major":
      return {
        root: base,
        mode: mode,
        accidentalCount: count,
        accidentalType: type,
      };
    case "natural minor":
    case "harmonic minor":
      return {
        root: intervalDown(base, "min3"),
        mode: mode,
        accidentalCount: count,
        accidentalType: type,
      };
  }
}

// export function getKeyFromRoot(root: PitchClass, mode: Mode): KeySignature {
//
// }
