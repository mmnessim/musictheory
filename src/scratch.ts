type HFunction = "tonic" | "tonic ext" | "predominant" | "dominant";
const transitions: Record<HFunction, HFunction[]> = {
  tonic: ["tonic ext", "predominant", "dominant"],
  "tonic ext": ["tonic", "predominant"],
  predominant: ["tonic", "dominant"],
  dominant: ["tonic"],
};
function nextFunction(current: HFunction): HFunction {
  const options = transitions[current];
  return options[Math.floor(Math.random() * options.length)]!;
}

function* progressionGen(
  current: HFunction,
  maxDepth: number = 8,
): Generator<HFunction[]> {
  if (current === "dominant") {
    yield [current, "tonic"];
    return;
  }
  if (maxDepth === 0) return;
  for (const next of transitions[current]) {
    for (const rest of progressionGen(next, maxDepth - 1)) {
      yield [current, ...rest];
    }
  }
}

// for (const p of progressionGen("tonic")) {
//   console.log(p.join(" -> "));
// }

// function randomProgression(): HFunction[] {
//   let result: HFunction[] = [];
//   let count = 0;
//   for (const p of progressionGen("tonic")) {
//     count++;
//     if (Math.random() < 1 / count) {
//       result = p;
//     }
//   }
//   return result;
// }
function randomProgression(): HFunction[] {
  let result: HFunction[] = [];
  let count = 0;
  for (const p of progressionGen("tonic")) {
    count++;
    result = p;
    if (count >= 1) {
      break;
    }
  }
  return result;
}
console.log(randomProgression().join(" -> "));
