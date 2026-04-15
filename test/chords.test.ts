import { expect, test, describe } from "bun:test";
import { makeChord, type Chord, type ChordType } from "../src/chords";
import type { PitchClass } from "../src";

describe("makeChord()", () => {
  const cases: [ChordType, PitchClass, Chord][] = [
    // F#
    [
      "major",
      "F#",
      {
        chordType: "major",
        root: "F#",
        third: "A#",
        fifth: "C#",
        seventh: undefined,
      },
    ],
    [
      "minor",
      "F#",
      {
        chordType: "minor",
        root: "F#",
        third: "A",
        fifth: "C#",
        seventh: undefined,
      },
    ],
    [
      "dim",
      "F#",
      {
        chordType: "dim",
        root: "F#",
        third: "A",
        fifth: "C",
        seventh: undefined,
      },
    ],
    [
      "dom7",
      "F#",
      { chordType: "dom7", root: "F#", third: "A#", fifth: "C#", seventh: "E" },
    ],
    [
      "halfDim7",
      "F#",
      {
        chordType: "halfDim7",
        root: "F#",
        third: "A",
        fifth: "C",
        seventh: "E",
      },
    ],
    [
      "fullDim7",
      "F#",
      {
        chordType: "fullDim7",
        root: "F#",
        third: "A",
        fifth: "C",
        seventh: "Eb",
      },
    ],
    // Gb
    [
      "major",
      "Gb",
      {
        chordType: "major",
        root: "Gb",
        third: "Bb",
        fifth: "Db",
        seventh: undefined,
      },
    ],
    [
      "minor",
      "Gb",
      {
        chordType: "minor",
        root: "Gb",
        third: "Bbb",
        fifth: "Db",
        seventh: undefined,
      },
    ],
    [
      "dim",
      "Gb",
      {
        chordType: "dim",
        root: "Gb",
        third: "Bbb",
        fifth: "Dbb",
        seventh: undefined,
      },
    ],
    [
      "dom7",
      "Gb",
      {
        chordType: "dom7",
        root: "Gb",
        third: "Bb",
        fifth: "Db",
        seventh: "Fb",
      },
    ],
    [
      "halfDim7",
      "Gb",
      {
        chordType: "halfDim7",
        root: "Gb",
        third: "Bbb",
        fifth: "Dbb",
        seventh: "Fb",
      },
    ],
    [
      "fullDim7",
      "Gb",
      {
        chordType: "fullDim7",
        root: "Gb",
        third: "Bbb",
        fifth: "Dbb",
        seventh: "Fbb",
      },
    ],
    // C#
    [
      "major",
      "C#",
      {
        chordType: "major",
        root: "C#",
        third: "E#",
        fifth: "G#",
        seventh: undefined,
      },
    ],
    [
      "minor",
      "C#",
      {
        chordType: "minor",
        root: "C#",
        third: "E",
        fifth: "G#",
        seventh: undefined,
      },
    ],
    [
      "dim",
      "C#",
      {
        chordType: "dim",
        root: "C#",
        third: "E",
        fifth: "G",
        seventh: undefined,
      },
    ],
    [
      "dom7",
      "C#",
      { chordType: "dom7", root: "C#", third: "E#", fifth: "G#", seventh: "B" },
    ],
    [
      "halfDim7",
      "C#",
      {
        chordType: "halfDim7",
        root: "C#",
        third: "E",
        fifth: "G",
        seventh: "B",
      },
    ],
    [
      "fullDim7",
      "C#",
      {
        chordType: "fullDim7",
        root: "C#",
        third: "E",
        fifth: "G",
        seventh: "Bb",
      },
    ],
    // Cb
    [
      "major",
      "Cb",
      {
        chordType: "major",
        root: "Cb",
        third: "Eb",
        fifth: "Gb",
        seventh: undefined,
      },
    ],
    [
      "minor",
      "Cb",
      {
        chordType: "minor",
        root: "Cb",
        third: "Ebb",
        fifth: "Gb",
        seventh: undefined,
      },
    ],
    [
      "dim",
      "Cb",
      {
        chordType: "dim",
        root: "Cb",
        third: "Ebb",
        fifth: "Gbb",
        seventh: undefined,
      },
    ],
    [
      "dom7",
      "Cb",
      {
        chordType: "dom7",
        root: "Cb",
        third: "Eb",
        fifth: "Gb",
        seventh: "Bbb",
      },
    ],
    [
      "halfDim7",
      "Cb",
      {
        chordType: "halfDim7",
        root: "Cb",
        third: "Ebb",
        fifth: "Gbb",
        seventh: "Bbb",
      },
    ],
    // Cb fullDim7 would require a triple flat (Bbbb) which is not in PitchClass — omitted
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

  test.each(cases)(
    "%s %s %o",
    (chordType: ChordType, root: PitchClass, expected: Chord) => {
      expect(makeChord(chordType, root)).toEqual(expected);
    },
  );
});
