import { makeChord, type Chord, type ChordType } from "./chords";
import { randomProgression, type FunctionalArea } from "./harmonicProgression";
import { makeScale, type PitchClass } from "./intervals";

/** Raw roman numerals for each scale degree. Does not represent chord quality */
export type ScaleNumeral = "I" | "II" | "III" | "IV" | "V" | "VI" | "VII";
export type Mode = "major" | "natural minor" | "harmonic minor";

export type NumeralChords = {
  degree: ScaleNumeral;
  chordType: ChordType;
};

/** Lookup table of roman numerals based on functional area */
export const areaNumerals: Record<FunctionalArea, ScaleNumeral[]> = {
  tonic: ["I"],
  "tonic extension": ["III", "VI"],
  predominant: ["II", "IV", "VI"],
  dominant: ["V", "VII"],
};

/** Lookup table of major key chords by roman numeral */
export const majorKeyChords: Record<ScaleNumeral, ChordType[]> = {
  I: ["major"],
  II: ["minor"],
  III: ["minor"],
  IV: ["major"],
  V: ["major", "dom7"],
  VI: ["minor"],
  VII: ["dim", "halfDim7"],
};

/** Lookup table of minor key chords by roman numeral for natural minor */
export const natMinorKeyChords: Record<ScaleNumeral, ChordType[]> = {
  I: ["minor"],
  II: ["dim"],
  III: ["major"],
  IV: ["minor"],
  V: ["minor"],
  VI: ["major"],
  VII: ["major"],
};

/** Lookup table of minor key chords by roman numeral for harmonic minor */
export const harmMinorKeyChords: Record<ScaleNumeral, ChordType[]> = {
  I: ["minor"],
  II: ["dim"],
  III: ["major"],
  IV: ["minor"],
  V: ["major", "dom7"],
  VI: ["major"],
  VII: ["dim", "halfDim7"],
};

/** Helper lookup table to dispatch correct mode */
export const modeChords: Record<Mode, Record<ScaleNumeral, ChordType[]>> = {
  major: majorKeyChords,
  "natural minor": natMinorKeyChords,
  "harmonic minor": harmMinorKeyChords,
};

/**
 * Translates a progression to a series of valid roman numerals.
 * @param progression progression of functional areas
 * @param mode option of major, natural minor, or harmonic minor
 * @returns array of NumeralChords (roman numerals)
 */
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
      chordType: chordTypes[Math.floor(Math.random() * chordTypes.length)]!,
    };
  });
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
export function randomChordProgression(root: PitchClass, mode: Mode): Chord[] {
  const numerals: NumeralChords[] = randomRomanNumeralProgression(mode);
  const scale = makeScale(root, mode);
  console.log(scale);
  const chords: Chord[] = [];
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
    chords.push(makeChord(num.chordType, noteMap[num.degree]));
  }
  return chords;
}
