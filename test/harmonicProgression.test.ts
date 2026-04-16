import { test, describe, expect } from "bun:test";
import {
  getProgressions,
  randomProgression,
  transitions,
  type FunctionalArea,
  nextFunction,
  walkProgressions,
} from "../src/harmonicProgression";

describe("nextFunction() returns a valid option", () => {
  const cases: [FunctionalArea, FunctionalArea[]][] = [
    ["tonic", ["tonic extension", "predominant", "dominant"]],
    ["tonic extension", ["tonic", "predominant"]],
    ["predominant", ["predominant", "dominant"]],
    ["dominant", ["tonic"]],
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

describe("walkProgressions() returns progressions ending in dominant -> tonic", () => {
  test("all progressions end in dominant -> tonic", () => {
    for (const progression of walkProgressions()) {
      expect(progression.at(-2)).toBe("dominant");
      expect(progression.at(-1)).toBe("tonic");
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

  test("every progression ends in dominant -> tonic", () => {
    for (const progression of getProgressions()) {
      expect(progression.at(-2)).toBe("dominant");
      expect(progression.at(-1)).toBe("tonic");
    }
  });
});

describe("randomProgression()", () => {
  test("returns a single progression", () => {
    const result = randomProgression();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(3);
  });

  test("ends in dominant -> tonic", () => {
    const result = randomProgression();
    expect(result.at(-2)).toBe("dominant");
    expect(result.at(-1)).toBe("tonic");
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
