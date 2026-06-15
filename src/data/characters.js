import { assetPath } from "../utils/assetPath.js";
export const characters = {
  Nick: {
    name: "Nick",
    images: {
      normal: assetPath("/assets/characters-cutout/nick-normal.png"),
      embarrassed: assetPath("/assets/characters-cutout/nick-embarrassed.png"),
      happy: assetPath("/assets/characters-cutout/nick-happy.png"),
      worried: assetPath("/assets/characters-cutout/nick-worried.png"),
    },
  },
  Emma: {
    name: "Emma",
    images: {
      normal: assetPath("/assets/characters-cutout/emma-normal.png"),
      gentle: assetPath("/assets/characters-cutout/emma-gentle.png"),
      concerned: assetPath("/assets/characters-cutout/emma-concerned.png"),
    },
  },
  Mia: {
    name: "Mia",
    images: {
      normal: assetPath("/assets/characters-cutout/mia-normal.png"),
      cheerful: assetPath("/assets/characters-cutout/mia-cheerful.png"),
      surprised: assetPath("/assets/characters-cutout/mia-surprised.png"),
    },
  },
};
