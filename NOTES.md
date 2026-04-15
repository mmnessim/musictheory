# Notes

This document is used for conceptualizing design, updates, and concepts

# Progression Generation

A **graph** is a set of nodes with connections between them — like a map where each city has roads leading to other cities. Harmonic functions work the same way: each function has a set of valid functions that can follow it.


## Types and Data

`HarmonicFunction` is the node type, `transitions` is the graph:

``` typescript
type HarmonicFunction = "tonic" | "tonic ext" | "predominant" | "dominant";

const transitions: Record<HarmonicFunction, HarmonicFunction[]> = {
  tonic:       ["tonic ext", "predominant", "dominant"],
  "tonic ext": ["tonic", "predominant"],
  predominant: ["tonic", "dominant"],
  dominant:    ["tonic"],
};
​
```


## Functions

**`nextFunction(current)`** — picks a random valid next node from the graph. One step, no memory of where you've been.

**`walkProgression(start, maxDepth)`** — generator function. Traverses the graph depth-first from `start`. When it reaches `dominant`, it terminates by yielding `[...path, "dominant", "tonic"]`. `maxDepth` prevents infinite loops through cycles like tonic → tonic ext → tonic.

**`allProgressions`** — lazily cached on first access. Computed once, reused forever. Only pays the generation cost if progressions are actually requested.

**`randomProgression()`** — calls `allProgressions`, picks a random index.