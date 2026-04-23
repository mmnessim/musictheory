import { allCadences, insertCadence } from "./cadences.js";
import { type ChordType } from "./chords.js";
import { type FunctionalArea } from "./harmonicProgression.js";

/**
 * Scale numerals represented in Roman numeral notation.
 * Used to identify degrees of a scale (I-VII) regardless of the key.
 */
export type ScaleNumeral = "I" | "II" | "III" | "IV" | "V" | "VI" | "VII";

/**
 * Supported musical modes for harmonic context.
 */
export type Mode = "major" | "natural minor" | "harmonic minor";

/**
 * Combines a scale degree with a chord quality to define a harmonic unit.
 */
export type NumeralChords = {
  /** The Roman numeral degree of the chord */
  degree: ScaleNumeral;
  /** The quality of the chord (e.g., "major", "minor") */
  chordType: ChordType;
};

/** Scale degrees typically used in a tonic function. */
export const tonicNumerals: ScaleNumeral[] = ["I"];

/** Scale degrees used for extending the tonic area. */
export const tonicExtNumerals: ScaleNumeral[] = ["III"];

/** Scale degrees typically used in a predominant function. */
export const predominantNumerals: ScaleNumeral[] = ["II", "IV", "VI"];

/** Scale degrees typically used in a dominant function. */
export const dominantNumerals: ScaleNumeral[] = ["V", "VII"];

/** Scale degrees reserved for specific cadence patterns (initially empty). */
export const cadenceNumerals: ScaleNumeral[] = [];

/**
 * Maps harmonic functional areas to their corresponding scale numerals.
 */
export const areaNumerals: Record<FunctionalArea, ScaleNumeral[]> = {
  tonic: tonicNumerals,
  "tonic extension": tonicExtNumerals,
  predominant: predominantNumerals,
  dominant: dominantNumerals,
  cadence: cadenceNumerals,
};

/**
 * Diatonic chord qualities for each degree in a Major key.
 */
export const majorKeyChords: Record<ScaleNumeral, ChordType[]> = {
  I: ["major"],
  II: ["minor"],
  III: ["minor"],
  IV: ["major"],
  V: ["major", "dom7"],
  VI: ["minor"],
  VII: ["dim", "halfDim7"],
};

/**
 * Diatonic chord qualities for each degree in a Natural Minor key.
 */
export const natMinorKeyChords: Record<ScaleNumeral, ChordType[]> = {
  I: ["minor"],
  II: ["dim"],
  III: ["major"],
  IV: ["minor"],
  V: ["minor"],
  VI: ["major"],
  VII: ["major"],
};

/**
 * Diatonic chord qualities for each degree in a Harmonic Minor key.
 */
export const harmMinorKeyChords: Record<ScaleNumeral, ChordType[]> = {
  I: ["minor"],
  II: ["dim"],
  III: ["major"],
  IV: ["minor"],
  V: ["major", "dom7"],
  VI: ["major"],
  VII: ["dim", "halfDim7"],
};

/**
 * Dispatches the correct diatonic chord lookup table based on the mode.
 */
export const modeChords: Record<Mode, Record<ScaleNumeral, ChordType[]>> = {
  major: majorKeyChords,
  "natural minor": natMinorKeyChords,
  "harmonic minor": harmMinorKeyChords,
};

/**
 * Translates a sequence of functional areas into specific Roman numeral chords.
 * Handles the special "cadence" function by selecting from predefined cadence patterns.
 * @param progression An array of functional areas (e.g., ["tonic", "dominant", "tonic"]).
 * @param mode The musical mode to use for chord quality lookup.
 * @returns An array of NumeralChords representing the progression.
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
