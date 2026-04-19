import type { VoicedChord } from "../chords.js";
import type { PitchClass } from "../intervals.js";
import type { Octave, Pitch } from "../pitch.js";

/**
 * Lookup table of abcjs notation for octaves 0-7
 */
export const AbcOctave: Record<Octave, string> = {
  0: ",,,,",
  1: ",,,",
  2: ",,",
  3: ",",
  4: "",
  5: "'",
  6: "''",
  7: "'''",
};

/**
 * Translate Pitch (pitchClass and octave) to abcjs notation string
 * @param pitch
 * @returns abcjs string
 * @example pitchToAbc({pitchClass: 'C#', octave:3}) => '^C,'
 */
export function pitchToAbc(pitch: Pitch): string {
  return `${pitchClassToAbc(pitch.pitchClass)}${AbcOctave[pitch.octave]}`;
}

/**
 * Helper function to translate sharps and flats into abcjs notation
 * Sharps are prepended ^
 * Flats are prepended _
 * @param p
 * @returns abcjs string
 * @example pitchClassToAbc('Bb') => '_B'
 */
export function pitchClassToAbc(p: PitchClass): string {
  if (p.endsWith("x")) return `^^${p[0]}`;
  if (p.endsWith("#")) return `^${p[0]}`;
  if (p.endsWith("bb")) return `__${p[0]}`;
  if (p.endsWith("b")) return `_${p[0]}`;
  return p;
}

/**
 * Translate VoicedChord into abcjs strings
 * @param vc
 * @returns abcjs string
 */
export function voicedChordToAbc(vc: VoicedChord): string {
  let notesString = "";
  for (const n of vc.notes) {
    notesString += pitchToAbc(n);
  }
  return `[${notesString}]`;
}

type AbcHeaderOptions = {
  title: string;
  key?: string;
  clef?: string;
  timeSignature?: string;
  tempo?: number;
};

export function abcHeader({
  title,
  key = "C",
  clef = "treble",
  timeSignature = "4/4",
  tempo = 120,
}: AbcHeaderOptions): string {
  return [
    `X:1`,
    `T:${title}`,
    `M:${timeSignature}`,
    `Q:${tempo}`,
    `K:${key} clef=${clef}`,
  ].join("\n");
}
