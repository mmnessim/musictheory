import {
  modeChords,
  type Mode,
  type NumeralChords,
  type ScaleNumeral,
} from "./romanNumerals";

export type Cadence = ScaleNumeral[];

export const plagalCadence: Cadence = ["I", "IV", "I"];
export const deceptiveCadence: Cadence = ["V", "VI"];
export const authenticCadence: Cadence = ["I"];

export const allCadences: Cadence[] = [
  authenticCadence,
  plagalCadence,
  deceptiveCadence,
];

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
