import {
  modeChords,
  type Mode,
  type NumeralChords,
  type ScaleNumeral,
} from "./romanNumerals.js";

/**
 * A sequence of scale degrees representing a musical cadence.
 */
export type Cadence = ScaleNumeral[];

/**
 * Plagal cadence: IV -> I (often referred to as the "Amen" cadence).
 * Here represented as I -> IV -> I for context.
 */
export const plagalCadence: Cadence = ["I", "IV", "I"];

/**
 * Deceptive cadence: V -> VI (the listener expects I, but gets VI instead).
 */
export const deceptiveCadence: Cadence = ["V", "VI"];

/**
 * Authentic cadence: V -> I (represented here as just I as the target).
 * Note: Often involves V or V7 preceding the I.
 */
export const authenticCadence: Cadence = ["I"];

/**
 * A collection of all defined cadences for random selection.
 */
export const allCadences: Cadence[] = [
  authenticCadence,
  plagalCadence,
  deceptiveCadence,
];

/**
 * Converts a abstract cadence (scale degrees) into specific chord types based on the mode.
 * @param cadence The cadence to translate.
 * @param mode The musical mode (major, natural minor, harmonic minor).
 * @returns An array of NumeralChords ready for progression building.
 */
export function insertCadence(cadence: Cadence, mode: Mode): NumeralChords[] {
  const result: NumeralChords[] = [];
  for (const c of cadence) {
    result.push({
      degree: c,
      chordType: modeChords[mode][c][0]!,
    });
  }
  return result;
}
