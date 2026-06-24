import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceFiles = [
  "index.html",
  "src/App.jsx",
  "src/components/BackgroundMusic.jsx",
  "src/components/ChoicePanel.jsx",
  "src/pages/HomePage.jsx",
  "src/utils/sound.js",
  "src/data/routes.js",
  "src/data/characters.js",
  "src/data/toolImages.js",
];

const assets = new Set();
assets.add("/assets/cover/cover-test.jpg");

for (const file of sourceFiles) {
  const source = fs.readFileSync(path.join(root, file), "utf8");

  for (const match of source.matchAll(/assetPath\("([^"]+)"\)/g)) {
    assets.add(match[1]);
  }

  for (const match of source.matchAll(/%BASE_URL%(assets\/[^"]+)/g)) {
    assets.add(`/${match[1]}`);
  }
}

for (const asset of assets) {
  const relativeAsset = asset.replace(/^\/+/, "");
  const from = path.join(root, "public", relativeAsset);
  const to = path.join(root, "dist", relativeAsset);

  if (!fs.existsSync(from)) {
    throw new Error(`Missing optimized asset: ${asset}`);
  }

  fs.mkdirSync(path.dirname(to), { recursive: true });
  try {
    fs.copyFileSync(from, to);
  } catch (error) {
    const fromSize = fs.statSync(from).size;
    const toSize = fs.existsSync(to) ? fs.statSync(to).size : -1;
    if (error.code === "EPERM" && toSize === fromSize) {
      continue;
    }
    throw error;
  }
}

console.log(`Copied ${assets.size} optimized assets.`);
