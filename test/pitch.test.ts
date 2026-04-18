import { expect, test, describe } from "bun:test";
import { octaveUp, octaveDown } from "../src/pitch";
import type { Pitch } from "../src/pitch";

describe("octaveUp()", () => {
  const cases: [Pitch, Pitch][] = [
    [{ pitchClass: "C", octave: 4 }, { pitchClass: "C", octave: 5 }],
    [{ pitchClass: "G#", octave: 0 }, { pitchClass: "G#", octave: 1 }],
    [{ pitchClass: "Bb", octave: 3 }, { pitchClass: "Bb", octave: 4 }],
    [{ pitchClass: "F#", octave: 6 }, { pitchClass: "F#", octave: 7 }],
    // clamps at octave 7
    [{ pitchClass: "C", octave: 7 }, { pitchClass: "C", octave: 7 }],
    [{ pitchClass: "B", octave: 7 }, { pitchClass: "B", octave: 7 }],
    [{ pitchClass: "Db", octave: 7 }, { pitchClass: "Db", octave: 7 }],
  ];

  test.each(cases)("%s -> %s", (input: Pitch, expected: Pitch) => {
    expect(octaveUp(input)).toEqual(expected);
  });
});

describe("octaveDown()", () => {
  const cases: [Pitch, Pitch][] = [
    [{ pitchClass: "C", octave: 4 }, { pitchClass: "C", octave: 3 }],
    [{ pitchClass: "G#", octave: 7 }, { pitchClass: "G#", octave: 6 }],
    [{ pitchClass: "Bb", octave: 5 }, { pitchClass: "Bb", octave: 4 }],
    [{ pitchClass: "F#", octave: 1 }, { pitchClass: "F#", octave: 0 }],
    // clamps at octave 0
    [{ pitchClass: "C", octave: 0 }, { pitchClass: "C", octave: 0 }],
    [{ pitchClass: "B", octave: 0 }, { pitchClass: "B", octave: 0 }],
    [{ pitchClass: "Db", octave: 0 }, { pitchClass: "Db", octave: 0 }],
  ];

  test.each(cases)("%s -> %s", (input: Pitch, expected: Pitch) => {
    expect(octaveDown(input)).toEqual(expected);
  });
});

describe("octaveUp then octaveDown roundtrips", () => {
  const pitches: Pitch[] = [
    { pitchClass: "C", octave: 4 },
    { pitchClass: "F#", octave: 2 },
    { pitchClass: "Bb", octave: 5 },
  ];

  test.each(pitches)("roundtrip %s", (pitch: Pitch) => {
    expect(octaveDown(octaveUp(pitch))).toEqual(pitch);
    expect(octaveUp(octaveDown(pitch))).toEqual(pitch);
  });
});

test("octaveUp preserves pitchClass", () => {
  const pitch: Pitch = { pitchClass: "Eb", octave: 3 };
  expect(octaveUp(pitch).pitchClass).toBe("Eb");
});

test("octaveDown preserves pitchClass", () => {
  const pitch: Pitch = { pitchClass: "G#", octave: 5 };
  expect(octaveDown(pitch).pitchClass).toBe("G#");
});
