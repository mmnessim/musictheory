import { test, describe, expect } from "bun:test";
import {
  getProgressions,
  randomProgression,
  transitions,
  type FunctionalArea,
  nextFunction,
  walkProgressions,
  randomRomanNumeralProgression,
  randomChordProgression,
  addSecondaryDominants,
} from "../src/harmonicProgression";
import { makeChord } from "../src/chords";
import { modeChords, areaNumerals } from "../src/romanNumerals";
import type { Mode } from "../src/romanNumerals";

describe("nextFunction() returns a valid option", () => {
  const cases: [FunctionalArea, FunctionalArea[]][] = [
    ["tonic", ["tonic extension", "predominant", "dominant"]],
    ["tonic extension", ["predominant"]],
    ["predominant", ["predominant", "dominant"]],
    ["dominant", ["cadence"]],
  ];

  test.each(cases)(
    "nextFunction(%s) returns a valid transition",
    (input, valid) => {
      for (let i = 0; i < 100; i++) {
        expect(nextFunction(input)).toBeOneOf(valid);
      }
    },
  );
});

describe("walkProgressions() returns progressions ending in dominant -> cadence", () => {
  test("all progressions end in dominant -> cadence", () => {
    for (const progression of walkProgressions()) {
      expect(progression.at(-2)).toBe("dominant");
      expect(progression.at(-1)).toBe("cadence");
    }
  });
});

test("each step is a valid transition", () => {
  for (const progression of walkProgressions()) {
    for (let i = 0; i < progression.length - 1; i++) {
      const current = progression[i]!;
      const next = progression[i + 1]!;
      expect(transitions[current]).toContain(next);
    }
  }
});

describe("getProgressions()", () => {
  test("returns an array of progressions", () => {
    const result = getProgressions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test("caches — returns the same reference on repeated calls", () => {
    const first = getProgressions();
    const second = getProgressions();
    expect(first).toBe(second); // reference equality, not deep equality
  });

  test("every progression ends in dominant -> cadence", () => {
    for (const progression of getProgressions()) {
      expect(progression.at(-2)).toBe("dominant");
      expect(progression.at(-1)).toBe("cadence");
    }
  });
});

describe("randomProgression()", () => {
  test("returns a single progression", () => {
    const result = randomProgression();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(3);
  });

  test("ends in dominant -> cadence", () => {
    const result = randomProgression();
    expect(result.at(-2)).toBe("dominant");
    expect(result.at(-1)).toBe("cadence");
  });

  test("starts with tonic", () => {
    const result = randomProgression();
    expect(result.at(0)).toBe("tonic");
  });

  test("returns different progressions over multiple calls", () => {
    const results = new Set(
      Array.from({ length: 100 }, () => randomProgression().join(",")),
    );
    expect(results.size).toBeGreaterThan(1);
  });
});

describe("randomRomanNumeralProgression()", () => {
  const modes: Mode[] = ["major", "natural minor", "harmonic minor"];

  test.each(modes)("returns non-empty array for %s", (mode: Mode) => {
    const result = randomRomanNumeralProgression(mode);
    expect(result.length).toBeGreaterThan(0);
  });

  test.each(modes)("every degree is valid for %s", (mode: Mode) => {
    for (let i = 0; i < 20; i++) {
      const result = randomRomanNumeralProgression(mode);
      for (const item of result) {
        const validTypes = modeChords[mode][item.degree];
        expect(validTypes).toContain(item.chordType);
      }
    }
  });

  test.each(modes)("no consecutive duplicate degrees for %s", (mode: Mode) => {
    for (let i = 0; i < 20; i++) {
      const result = randomRomanNumeralProgression(mode);
      for (let j = 1; j < result.length; j++) {
        expect(result[j]!.degree).not.toBe(result[j - 1]!.degree);
      }
    }
  });

  test.each(modes)("first degree is I (tonic) for %s", (mode: Mode) => {
    for (let i = 0; i < 20; i++) {
      const result = randomRomanNumeralProgression(mode);
      expect(areaNumerals["tonic"]).toContain(result[0]!.degree);
    }
  });
});

describe("randomChordProgression()", () => {
  test("root matches the requested root", () => {
    const prog = randomChordProgression("C", "major");
    expect(prog.root).toBe("C");
  });

  test("contains at least one item", () => {
    const prog = randomChordProgression("G", "major");
    expect(prog.items.length).toBeGreaterThan(0);
  });

  test("each item chord root comes from the scale", () => {
    // C major scale: C D E F G A B
    const prog = randomChordProgression("C", "major");
    const cMajorScale = new Set(["C", "D", "E", "F", "G", "A", "B"]);
    for (const item of prog.items) {
      expect(cMajorScale.has(item.chord.root)).toBe(true);
    }
  });

  test("each item numeral matches the chord root degree in the scale", () => {
    const numeralToIndex: Record<string, number> = {
      I: 0, II: 1, III: 2, IV: 3, V: 4, VI: 5, VII: 6,
    };
    for (let i = 0; i < 10; i++) {
      const prog = randomChordProgression("C", "major");
      const cMajorScale = ["C", "D", "E", "F", "G", "A", "B"];
      for (const item of prog.items) {
        const idx = numeralToIndex[item.numeral]!;
        expect(item.chord.root).toBe(cMajorScale[idx]);
      }
    }
  });

  test("works for natural minor", () => {
    const prog = randomChordProgression("A", "natural minor");
    expect(prog.root).toBe("A");
    expect(prog.items.length).toBeGreaterThan(0);
  });

  test("works for harmonic minor", () => {
    const prog = randomChordProgression("D", "harmonic minor");
    expect(prog.root).toBe("D");
    expect(prog.items.length).toBeGreaterThan(0);
  });
});

describe("addSecondaryDominants()", () => {
  test("inserts V7/II before a chord a maj2 above the root", () => {
    // In C major, D is a maj2 above C — so Dm gets a secondary dominant prepended
    const cMaj = makeChord("major", "C");
    const dMin = makeChord("minor", "D");
    const result = addSecondaryDominants([cMaj, dMin]);
    // dMin should have A dom7 prepended
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(cMaj);
    expect(result[1]).toEqual(makeChord("dom7", "A"));
    expect(result[2]).toEqual(dMin);
  });

  test("inserts V7/IV before a chord a p4 above the root", () => {
    // In C major, F is a p4 above C — so Fmaj gets a secondary dominant prepended
    const cMaj = makeChord("major", "C");
    const fMaj = makeChord("major", "F");
    const result = addSecondaryDominants([cMaj, fMaj]);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(cMaj);
    expect(result[1]).toEqual(makeChord("dom7", "C"));
    expect(result[2]).toEqual(fMaj);
  });

  test("leaves chords not a maj2 or p4 above root unchanged", () => {
    const cMaj = makeChord("major", "C");
    const gMaj = makeChord("major", "G");  // p5 above C — no secondary dominant
    const result = addSecondaryDominants([cMaj, gMaj]);
    expect(result).toEqual([cMaj, gMaj]);
  });

  test("handles a single-chord progression with no insertions", () => {
    const cMaj = makeChord("major", "C");
    expect(addSecondaryDominants([cMaj])).toEqual([cMaj]);
  });
});
