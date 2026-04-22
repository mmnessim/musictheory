import { expect, test, describe } from "bun:test";
import {
  AbcOctave,
  pitchToAbc,
  pitchClassToAbc,
  voicedChordToAbc,
  abcHeader,
} from "../../src/abcjs/abcNotation";
import { makeChord, voiceChord } from "../../src/chords";

describe("AbcOctave", () => {
  test("octave 4 is empty string", () => {
    expect(AbcOctave[4]).toBe("");
  });

  test("octave 3 is comma", () => {
    expect(AbcOctave[3]).toBe(",");
  });

  test("octave 5 is apostrophe", () => {
    expect(AbcOctave[5]).toBe("'");
  });

  test("octave 0 is four commas", () => {
    expect(AbcOctave[0]).toBe(",,,,");
  });

  test("octave 7 is three apostrophes", () => {
    expect(AbcOctave[7]).toBe("'''");
  });
});

describe("pitchClassToAbc()", () => {
  const cases: [string, string][] = [
    ["C", "C"],
    ["G", "G"],
    ["F#", "^F"],
    ["C#", "^C"],
    ["Bb", "_B"],
    ["Eb", "_E"],
    ["Bbb", "__B"],
    ["Ebb", "__E"],
    ["Fx", "^^F"],
    ["Cx", "^^C"],
  ];

  test.each(cases)("%s → %s", (input, expected) => {
    expect(pitchClassToAbc(input as any)).toBe(expected);
  });
});

describe("pitchToAbc()", () => {
  test("C natural octave 4 (middle C)", () => {
    expect(pitchToAbc({ pitchClass: "C", octave: 4 })).toBe("C");
  });

  test("C# octave 3", () => {
    expect(pitchToAbc({ pitchClass: "C#", octave: 3 })).toBe("^C,");
  });

  test("Bb octave 5", () => {
    expect(pitchToAbc({ pitchClass: "Bb", octave: 5 })).toBe("_B'");
  });

  test("G octave 2", () => {
    expect(pitchToAbc({ pitchClass: "G", octave: 2 })).toBe("G,,");
  });

  test("Bbb octave 6", () => {
    expect(pitchToAbc({ pitchClass: "Bbb", octave: 6 })).toBe("__B''");
  });

  test("Fx octave 0", () => {
    expect(pitchToAbc({ pitchClass: "Fx", octave: 0 })).toBe("^^F,,,,");
  });
});

describe("voicedChordToAbc()", () => {
  test("C major root position at octave 4", () => {
    const chord = makeChord("major", "C");
    const voiced = voiceChord(chord, 4, "root")!;
    expect(voicedChordToAbc(voiced)).toBe("[CEG]");
  });

  test("C major first inversion at octave 4", () => {
    const chord = makeChord("major", "C");
    const voiced = voiceChord(chord, 4, "first")!;
    expect(voicedChordToAbc(voiced)).toBe("[EGC']");
  });

  test("G dom7 root position at octave 3", () => {
    const chord = makeChord("dom7", "G");
    const voiced = voiceChord(chord, 3, "root")!;
    expect(voicedChordToAbc(voiced)).toBe("[G,B,DF]");
  });

  test("F# major root position at octave 4", () => {
    const chord = makeChord("major", "F#");
    const voiced = voiceChord(chord, 4, "root")!;
    expect(voicedChordToAbc(voiced)).toBe("[^F^A^C']");
  });
});

describe("abcHeader()", () => {
  test("required title only uses defaults", () => {
    const result = abcHeader({ title: "My Song" });
    expect(result).toContain("X:1");
    expect(result).toContain("T:My Song");
    expect(result).toContain("M:4/4");
    expect(result).toContain("Q:120");
    expect(result).toContain("K:C clef=treble");
  });

  test("custom key and clef", () => {
    const result = abcHeader({ title: "Test", key: "G", clef: "bass" });
    expect(result).toContain("K:G clef=bass");
  });

  test("custom time signature and tempo", () => {
    const result = abcHeader({
      title: "Waltz",
      timeSignature: "3/4",
      tempo: 90,
    });
    expect(result).toContain("M:3/4");
    expect(result).toContain("Q:90");
  });

  test("lines are newline-separated", () => {
    const result = abcHeader({ title: "Test" });
    const lines = result.split("\n");
    expect(lines).toHaveLength(5);
    expect(lines[0]).toBe("X:1");
  });
});
