import { describe, test, expect } from "bun:test";
import {
  progressionToRomanNumerals,
  areaNumerals,
  modeChords,
  type Mode,
} from "../src/romanNumerals";
import type { FunctionalArea } from "../src/harmonicProgression";

const ALL_MODES: Mode[] = ["major", "natural minor", "harmonic minor"];

describe("progressionToRomanNumerals()", () => {
  test("returns one NumeralChord per functional area", () => {
    const progression: FunctionalArea[] = [
      "tonic",
      "predominant",
      "dominant",
      "tonic",
    ];
    const result = progressionToRomanNumerals(progression, "major");
    expect(result).toHaveLength(progression.length);
  });

  test("returns an empty array for an empty progression", () => {
    expect(progressionToRomanNumerals([], "major")).toEqual([]);
  });

  test("each degree is valid for its functional area (run 200x)", () => {
    const progression: FunctionalArea[] = [
      "tonic",
      "tonic extension",
      "predominant",
      "dominant",
    ];

    for (let i = 0; i < 200; i++) {
      const result = progressionToRomanNumerals(progression, "major");
      result.forEach(({ degree }, idx) => {
        const validDegrees = areaNumerals[progression[idx]!];
        expect(validDegrees).toContain(degree);
      });
    }
  });

  test("each chordType is valid for its degree and mode (run 200x)", () => {
    const progression: FunctionalArea[] = [
      "tonic",
      "tonic extension",
      "predominant",
      "dominant",
    ];

    for (const mode of ALL_MODES) {
      for (let i = 0; i < 200; i++) {
        const result = progressionToRomanNumerals(progression, mode);
        result.forEach(({ degree, chordTypes }) => {
          const validTypes = modeChords[mode][degree];
          expect(validTypes).toContain(chordTypes);
        });
      }
    }
  });

  test("produces different outputs over multiple calls (randomness check)", () => {
    const progression: FunctionalArea[] = [
      "tonic",
      "predominant",
      "dominant",
      "tonic",
    ];
    const seen = new Set(
      Array.from({ length: 100 }, () =>
        progressionToRomanNumerals(progression, "major")
          .map((n) => `${n.degree}:${n.chordTypes}`)
          .join(","),
      ),
    );
    expect(seen.size).toBeGreaterThan(1);
  });

  test("single-element progressions work for all functional areas and modes", () => {
    const areas: FunctionalArea[] = [
      "tonic",
      "tonic extension",
      "predominant",
      "dominant",
    ];

    for (const mode of ALL_MODES) {
      for (const area of areas) {
        for (let i = 0; i < 50; i++) {
          const [result] = progressionToRomanNumerals([area], mode);
          expect(result).toBeDefined();
          expect(areaNumerals[area]).toContain(result!.degree);
          expect(modeChords[mode][result!.degree]).toContain(
            result!.chordTypes,
          );
        }
      }
    }
  });
});
