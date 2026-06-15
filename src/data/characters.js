import { assetPath } from "../utils/assetPath.js";
export const characters = {
  Nick: {
    name: "Nick",
    images: {
      normal: assetPath("/assets/characters-cutout/nick-normal-mobile.png"),
      embarrassed: assetPath("/assets/characters-cutout/nick-embarrassed-mobile.png"),
      happy: assetPath("/assets/characters-cutout/nick-happy-mobile.png"),
      worried: assetPath("/assets/characters-cutout/nick-worried-mobile.png"),
    },
  },
  Emma: {
    name: "Emma",
    images: {
      normal: assetPath("/assets/characters-cutout/emma-normal-mobile.png"),
      gentle: assetPath("/assets/characters-cutout/emma-gentle-mobile.png"),
      concerned: assetPath("/assets/characters-cutout/emma-concerned-mobile.png"),
    },
  },
  Mia: {
    name: "Mia",
    images: {
      normal: assetPath("/assets/characters-cutout/mia-normal-mobile.png"),
      cheerful: assetPath("/assets/characters-cutout/mia-cheerful-mobile.png"),
      surprised: assetPath("/assets/characters-cutout/mia-surprised-mobile.png"),
    },
  },
};
