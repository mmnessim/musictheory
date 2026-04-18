import { expect, test, describe } from "bun:test";
import {
  makeChord,
  secondaryDominant,
  voiceChord,
  type Chord,
  type ChordType,
} from "../src/chords";
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

describe("secondaryDominant()", () => {
  test("returns [V7/V, V] for a major chord", () => {
    const gMajor = makeChord("major", "G");
    const result = secondaryDominant(gMajor);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(makeChord("dom7", "D"));
    expect(result[1]).toEqual(gMajor);
  });

  test("returns [V7/ii, ii] for a minor chord", () => {
    const dMinor = makeChord("minor", "D");
    const result = secondaryDominant(dMinor);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(makeChord("dom7", "A"));
    expect(result[1]).toEqual(dMinor);
  });

  test("returns [V7/I, I] for C major", () => {
    const cMajor = makeChord("major", "C");
    const result = secondaryDominant(cMajor);
    expect(result[0]).toEqual(makeChord("dom7", "G"));
  });

  test("dim chord passes through unchanged (single element)", () => {
    const bDim = makeChord("dim", "B");
    expect(secondaryDominant(bDim)).toEqual([bDim]);
  });

  test("halfDim7 chord passes through unchanged", () => {
    const chord = makeChord("halfDim7", "B");
    expect(secondaryDominant(chord)).toEqual([chord]);
  });

  test("fullDim7 chord passes through unchanged", () => {
    const chord = makeChord("fullDim7", "B");
    expect(secondaryDominant(chord)).toEqual([chord]);
  });
});

describe("voiceChord()", () => {
  const cMajor = makeChord("major", "C");
  const gDom7 = makeChord("dom7", "G");

  describe("root position (triad)", () => {
    test("C major root position at octave 4", () => {
      const voiced = voiceChord(cMajor, 4, "root");
      expect(voiced?.inversion).toBe("root");
      expect(voiced?.notes).toEqual([
        { pitchClass: "C", octave: 4 },
        { pitchClass: "E", octave: 4 },
        { pitchClass: "G", octave: 4 },
      ]);
    });
  });

  describe("first inversion (triad)", () => {
    test("C major first inversion at octave 4", () => {
      const voiced = voiceChord(cMajor, 4, "first");
      expect(voiced?.inversion).toBe("first");
      expect(voiced?.notes).toEqual([
        { pitchClass: "E", octave: 4 },
        { pitchClass: "G", octave: 4 },
        { pitchClass: "C", octave: 5 },
      ]);
    });
  });

  describe("second inversion (triad)", () => {
    test("C major second inversion at octave 4", () => {
      const voiced = voiceChord(cMajor, 4, "second");
      expect(voiced?.inversion).toBe("second");
      expect(voiced?.notes).toEqual([
        { pitchClass: "G", octave: 4 },
        { pitchClass: "C", octave: 5 },
        { pitchClass: "E", octave: 5 },
      ]);
    });
  });

  describe("seventh chords", () => {
    test("G dom7 root position at octave 3 includes seventh", () => {
      const voiced = voiceChord(gDom7, 3, "root");
      expect(voiced?.notes).toEqual([
        { pitchClass: "G", octave: 3 },
        { pitchClass: "B", octave: 3 },
        { pitchClass: "D", octave: 4 },
        { pitchClass: "F", octave: 4 },
      ]);
    });

    test("G dom7 first inversion at octave 3", () => {
      const voiced = voiceChord(gDom7, 3, "first");
      expect(voiced?.notes).toEqual([
        { pitchClass: "B", octave: 3 },
        { pitchClass: "D", octave: 4 },
        { pitchClass: "F", octave: 4 },
        { pitchClass: "G", octave: 4 },
      ]);
    });

    test("G dom7 second inversion at octave 3", () => {
      const voiced = voiceChord(gDom7, 3, "second");
      expect(voiced?.notes).toEqual([
        { pitchClass: "D", octave: 4 },
        { pitchClass: "F", octave: 4 },
        { pitchClass: "G", octave: 4 },
        { pitchClass: "B", octave: 4 },
      ]);
    });
  });

  describe("third inversion", () => {
    test("returns undefined (not implemented)", () => {
      expect(voiceChord(gDom7, 4, "third")).toBeUndefined();
    });
  });

  describe("default inversion is root", () => {
    test("omitting inversion defaults to root position", () => {
      expect(voiceChord(cMajor, 4)).toEqual(voiceChord(cMajor, 4, "root"));
    });
  });
});
