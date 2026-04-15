import { test, describe, expect } from "bun:test";
import {
  type HarmonicFunction,
  nextFunction,
} from "../src/harmonicProgression";

describe("nextFunction() returns a valid option", () => {
  const cases: [HarmonicFunction, HarmonicFunction[]][] = [
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
