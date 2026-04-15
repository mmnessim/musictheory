export type FunctionalArea =
  | "tonic"
  | "tonic extension"
  | "predominant"
  | "dominant";

export const transitions: Record<FunctionalArea, FunctionalArea[]> = {
  tonic: ["tonic", "tonic extension", "predominant", "dominant"],
  "tonic extension": ["tonic", "predominant", "dominant"],
  predominant: ["predominant", "dominant"],
  dominant: ["tonic"],
};
