import actionChar from "./action-char.png";
import shooterChar from "./shooter-char.png";
import fightingChar from "./fighting-char.png";
import sportsChar from "./sports-char.png";
import adventureChar from "./adventure-char.png";
import rpgChar from "./rpg-char.png";

import actionBg from "./action-bg.jpg";
import shooterBg from "./shooter-bg.webp";
import fightingBg from "./fighting-bg.jpg";
import sportsBg from "./sports-bg.jpg";
import adventureBg from "./adventure-bg.jpg";
import rpgBg from "./rpg-bg.jpg";

export const CATEGORIES = [
  {
    title: "Action",
    bg: actionBg,
    char: actionChar,
    value: "action",
  },
  {
    title: "FPS",
    bg: shooterBg,
    char: shooterChar,
    value: "fps",
  },
  {
    title: "Fighting",
    bg: fightingBg,
    char: fightingChar,
    value: "fighting",
  },
  {
    title: "Sports",
    bg: sportsBg,
    char: sportsChar,
    value: "sports",
  },
  {
    title: "Adventure",
    bg: adventureBg,
    char: adventureChar,
    value: "adventure",
  },
  {
    title: "RPG",
    bg: rpgBg,
    char: rpgChar,
    value: "rpg",
  },
];
