import { assetPath } from "../utils/assetPath.js";
export const characters = {
  Nick: {
    name: "Nick",
    images: {
      normal: assetPath("/assets/characters-cutout/nick-normal-fast.webp"),
      embarrassed: assetPath("/assets/characters-cutout/nick-embarrassed-fast.webp"),
      happy: assetPath("/assets/characters-cutout/nick-happy-fast.webp"),
      worried: assetPath("/assets/characters-cutout/nick-worried-fast.webp"),
    },
  },
  Emma: {
    name: "Emma",
    images: {
      normal: assetPath("/assets/characters-cutout/emma-normal-fast.webp"),
      gentle: assetPath("/assets/characters-cutout/emma-gentle-fast.webp"),
      concerned: assetPath("/assets/characters-cutout/emma-concerned-fast.webp"),
    },
  },
  Mia: {
    name: "Mia",
    images: {
      normal: assetPath("/assets/characters-cutout/mia-normal-fast.webp"),
      cheerful: assetPath("/assets/characters-cutout/mia-cheerful-fast.webp"),
      surprised: assetPath("/assets/characters-cutout/mia-surprised-fast.webp"),
    },
  },
};
