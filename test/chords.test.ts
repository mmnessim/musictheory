import { expect, test, describe } from "bun:test";
import { makeChord, type Chord, type ChordType } from "../src/chords";
import type { PitchClass } from "../src";

describe("makeChord()", () => {
  const cases: [ChordType, PitchClass, Chord][] = [
    [
      "major",
      "C",
      {
        chordType: "major",
        root: "C",
        third: "E",
        fifth: "G",
        seventh: undefined,
      },
    ],
    [
      "minor",
      "C",
      {
        chordType: "minor",
        root: "C",
        third: "Eb",
        fifth: "G",
        seventh: undefined,
      },
    ],
    [
      "dim",
      "C",
      {
        chordType: "dim",
        root: "C",
        third: "Eb",
        fifth: "Gb",
        seventh: undefined,
      },
    ],
    [
      "dom7",
      "C",
      {
        chordType: "dom7",
        root: "C",
        third: "E",
        fifth: "G",
        seventh: "Bb",
      },
    ],
    [
      "halfDim7",
      "C",
      {
        chordType: "halfDim7",
        root: "C",
        third: "Eb",
        fifth: "Gb",
        seventh: "Bb",
      },
    ],
    /* This test fails until double flats are added */
    [
      "fullDim7",
      "C",
      {
        chordType: "fullDim7",
        root: "C",
        third: "Eb",
        fifth: "Gb",
        seventh: "Bbb",
      },
    ],
  ];

  test.each(cases)("%s %s %o", (chordType, root, expected) => {
    expect(makeChord(chordType, root)).toEqual(expected);
  });
});
