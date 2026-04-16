import type { ChordType } from "./chords";
import type { FunctionalArea } from "./harmonicProgression";

export type ScaleNumeral = "I" | "II" | "III" | "IV" | "V" | "VI" | "VII";
export type Mode = "major" | "natural minor" | "harmonic minor";

export type NumeralChords = {
  degree: ScaleNumeral;
  chordTypes: ChordType;
};

export const areaNumerals: Record<FunctionalArea, ScaleNumeral[]> = {
  tonic: ["I"],
  "tonic extension": ["III", "VI"],
  predominant: ["II", "IV", "VI"],
  dominant: ["V", "VII"],
};

export const majorKeyChords: Record<ScaleNumeral, ChordType[]> = {
  I: ["major"],
  II: ["minor"],
  III: ["minor"],
  IV: ["major"],
  V: ["major", "dom7"],
  VI: ["minor"],
  VII: ["dim", "halfDim7"],
};

export const natMinorKeyChords: Record<ScaleNumeral, ChordType[]> = {
  I: ["minor"],
  II: ["dim"],
  III: ["major"],
  IV: ["minor"],
  V: ["minor"],
  VI: ["major"],
  VII: ["major"],
};

export const harmMinorKeyChords: Record<ScaleNumeral, ChordType[]> = {
  I: ["minor"],
  II: ["dim"],
  III: ["major"],
  IV: ["minor"],
  V: ["major", "dom7"],
  VI: ["major"],
  VII: ["dim", "halfDim7"],
};

export const modeChords: Record<Mode, Record<ScaleNumeral, ChordType[]>> = {
  major: majorKeyChords,
  "natural minor": natMinorKeyChords,
  "harmonic minor": harmMinorKeyChords,
};

export function progressionToRomanNumerals(
  progression: FunctionalArea[],
  mode: Mode,
): NumeralChords[] {
  return progression.map((p) => {
    const options = areaNumerals[p];
    const degree = options[Math.floor(Math.random() * options.length)]!;
    const chordTypes = modeChords[mode][degree];
    return {
      degree,
      chordTypes: chordTypes[Math.floor(Math.random() * chordTypes.length)]!,
    };
  });
}
