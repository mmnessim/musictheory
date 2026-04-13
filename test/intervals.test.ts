import { expect, test, describe } from "bun:test";
import { intervalUp, type IntervalName, type PitchClass } from "../src";

describe("intervalUp() interval table", () => {
  const cases: [PitchClass, IntervalName, PitchClass][] = [
    ["C", "unison", "C"],
    ["C", "min2", "Db"],
    ["C", "maj2", "D"],
    ["C", "min3", "Eb"],
    ["C", "maj3", "E"],
    ["C", "p4", "F"],
    ["C", "aug4", "F#"],
    ["C", "dim5", "Gb"],
    ["C", "p5", "G"],
    ["C", "maj6", "A"],
    ["C", "min7", "Bb"],
    ["C", "maj7", "B"],

    // Enharmonic spellings
    ["E", "maj3", "G#"],
    ["C#", "maj3", "E#"],
  ];
  test.each(cases)("%s + %s = %s", (start, interval, expected) => {
    expect(intervalUp(start, interval)).toBe(expected);
  });
});
