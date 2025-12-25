const LABEL_MAP = {
  rpg: "RPG",
  gog: "GOG",
  ps5: "PS5",
  xbox: "Xbox",
  ea: "EA",
  ps: "PS",
  fps: "FPS",
};

export const formatLabel = (str) => {
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
