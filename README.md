# @mmnessim/music-theory

Music theory primitives for TypeScript: pitches, intervals, scales, chords, and harmonic progressions.

## Motivation

This project was motivated by experimentation with Prolog and logic programming. Music theory is a domain with a complex but finite set of rules and structures that map very neatly onto Prolog. I decided to make this a module in TypeScript to enable others to easily import it and use it in their projects, and to expand the domain modeling I had done in Prolog. 

The primary goal in making this project was to be able to generate valid chord progressions programmatically. In the end, I hope this module also serves as a simple basis for music projects in TypeScript or JavaScript.

## Installation

```sh
npm install @mmnessim/music-theory
```

## Concepts

**Pitch class** — a note name without an octave, e.g. `"C"`, `"F#"`, `"Bb"`. Enharmonic spellings are distinct (`"C#"` ≠ `"Db"`).

**Pitch** — a pitch class plus an octave (0–7), e.g. `{ pitchClass: "C", octave: 4 }`.

**Interval** — the distance between two notes, e.g. `"maj3"`, `"p5"`, `"min7"`.

**Mode** — `"major"`, `"natural minor"`, or `"harmonic minor"`.

**Functional area** — a harmonic function in common-practice harmony: `"tonic"`, `"tonic extension"`, `"predominant"`, `"dominant"`, or `"cadence"`. `"cadence"` is included to provide natural termination to generated progressions

## API

### Intervals

```ts
import { intervalUp, intervalDown, intervalBetween } from "@mmnessim/music-theory";

intervalUp("C", "maj3");         // => "E"
intervalUp("E", "maj3");         // => "G#"
intervalDown("G", "p5");         // => "C"
intervalBetween("C", "G", "up"); // => "p5"
```

### Pitches

```ts
import { intervalUpPitch, intervalDownPitch, octaveUp, octaveDown } from "@mmnessim/music-theory";
import type { Pitch } from "@mmnessim/music-theory";

const c4: Pitch = { pitchClass: "C", octave: 4 };

intervalUpPitch(c4, "p5");     // => { pitchClass: "G", octave: 4 }
intervalUpPitch(c4, "octave"); // => { pitchClass: "C", octave: 5 }
octaveUp(c4);                  // => { pitchClass: "C", octave: 5 }
octaveDown(c4);                // => { pitchClass: "C", octave: 3 }
```

### Scales

```ts
import { makeScale } from "@mmnessim/music-theory";

makeScale("C", "major");          // => ["C", "D", "E", "F", "G", "A", "B"]
makeScale("A", "natural minor");  // => ["A", "B", "C", "D", "E", "F", "G"]
makeScale("A", "harmonic minor"); // => ["A", "B", "C", "D", "E", "F", "G#"]
```

### Chords

```ts
import { makeChord, voiceChord } from "@mmnessim/music-theory";

const cMaj = makeChord("major", "C");
// => { chordType: "major", root: "C", third: "E", fifth: "G", seventh: undefined }

const gDom7 = makeChord("dom7", "G");
// => { chordType: "dom7", root: "G", third: "B", fifth: "D", seventh: "F" }
```

Supported chord types: `"major"`, `"minor"`, `"dim"`, `"dom7"`, `"halfDim7"`, `"fullDim7"`.

#### Voicing

```ts
voiceChord(cMaj, 4, "root");   // root in bass (default)
voiceChord(cMaj, 4, "first");  // third in bass
voiceChord(cMaj, 4, "second"); // fifth in bass
voiceChord(gDom7, 4, "third"); // seventh in bass (seventh chords only, undefined for triads)
```

#### Secondary dominants

```ts
import { secondaryDominant } from "@mmnessim/music-theory";

secondaryDominant(makeChord("major", "G"));
// => [makeChord("dom7", "D"), makeChord("major", "G")]
// dim/halfDim7/fullDim7 chords pass through unchanged
```

### Harmonic progressions

Progressions are modeled as a graph of functional areas. Every valid progression starts on `"tonic"` and ends `"dominant" → "cadence"`.

```ts
import {
  randomProgression,
  randomRomanNumeralProgression,
  randomChordProgression,
} from "@mmnessim/music-theory";

// Functional area sequence
randomProgression();
// => ["tonic", "predominant", "dominant", "cadence"]

// Roman numeral sequence
randomRomanNumeralProgression("major");
// => [{ degree: "I", chordType: "major" }, { degree: "IV", chordType: "major" }, ...]

// Full chord progression in a key
const prog = randomChordProgression("C", "major");
// => {
//      root: "C",
//      items: [
//        { chord: { chordType: "major", root: "C", ... }, numeral: "I" },
//        { chord: { chordType: "major", root: "F", ... }, numeral: "IV" },
//        ...
//      ]
//    }
```

#### Enumerate all valid progressions

```ts
import { getProgressions, walkProgressions } from "@mmnessim/music-theory";

getProgressions(); // all valid functional-area progressions (cached)

for (const p of walkProgressions()) {
  console.log(p); // ["tonic", "predominant", "dominant", "cadence"], ...
}
```

### Cadences

```ts
import {
  authenticCadence,
  plagalCadence,
  deceptiveCadence,
  insertCadence,
} from "@mmnessim/music-theory";

insertCadence(plagalCadence, "major");
// => [
//      { degree: "I", chordType: "major" },
//      { degree: "IV", chordType: "major" },
//      { degree: "I", chordType: "major" },
//    ]
```

## Roadmap

- **abcjs notation export** — render chords and progressions as ABC notation strings for use with [abcjs](https://www.abcjs.net/)
- **Richer progressions** — secondary dominants, borrowed chords (modal mixture), and extended progression graph options
- **Non-diatonic scales** — octatonic (diminished), whole-tone, and pentatonic scale support

## License

MIT
