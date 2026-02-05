const LABEL_MAP: Record<string, string> = {
  rpg: "RPG",
  gog: "GOG",
  ps5: "PS5",
  xbox: "Xbox",
  ea: "EA",
  ps: "PS",
  fps: "FPS",
};

export const formatLabel = (str: string | undefined | null): string => {
  /* Egz. open-wold => Open World , gog=> GOG*/
  if (!str) return "";

  return str
    .toLowerCase()
    .split("-")
    .map(
      (word) => LABEL_MAP[word] || word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
};
