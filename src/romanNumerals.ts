import { allCadences, insertCadence } from "./cadences.js";
import { type ChordType } from "./chords.js";
import { type FunctionalArea } from "./harmonicProgression.js";

/** Raw roman numerals for each scale degree. Does not represent chord quality */
// export type RomanNumeral = ScaleNumeral | SecondaryNumeral;
export type ScaleNumeral = "I" | "II" | "III" | "IV" | "V" | "VI" | "VII";
// export type SecondaryNumeral = "V/II" | "V/IV";
export type Mode = "major" | "natural minor" | "harmonic minor";

export type NumeralChords = {
  degree: ScaleNumeral;
  chordType: ChordType;
};

export const tonicNumerals: ScaleNumeral[] = ["I"];
export const tonicExtNumerals: ScaleNumeral[] = ["III"];
export const predominantNumerals: ScaleNumeral[] = ["II", "IV", "VI"];
export const dominantNumerals: ScaleNumeral[] = ["V", "VII"];
export const cadenceNumerals: ScaleNumeral[] = [];

/** Lookup table of roman numerals based on functional area */
export const areaNumerals: Record<FunctionalArea, ScaleNumeral[]> = {
  tonic: tonicNumerals,
  "tonic extension": tonicExtNumerals,
  predominant: predominantNumerals,
  dominant: dominantNumerals,
  cadence: cadenceNumerals,
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
  const result = progression.flatMap((p) => {
    if (p === "cadence") {
      const randomCadence =
        allCadences[Math.floor(Math.random() * allCadences.length)]!;
      return insertCadence(randomCadence, mode);
    }
    const options = areaNumerals[p as Exclude<FunctionalArea, "cadence">];
    const degree = options[Math.floor(Math.random() * options.length)]!;
    const chordTypes = modeChords[mode][degree];
    return {
      degree,
      chordType: chordTypes[Math.floor(Math.random() * chordTypes.length)]!,
    };
  });
  return result.filter(
    (item, i) => i === 0 || item.degree !== result[i - 1]!.degree,
  );
}
