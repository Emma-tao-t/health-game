import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceFiles = [
  "index.html",
  "src/App.jsx",
  "src/pages/HomePage.jsx",
  "src/data/routes.js",
  "src/data/characters.js",
  "src/data/toolImages.js",
];

const assets = new Set();

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
  fs.copyFileSync(from, to);
}

console.log(`Copied ${assets.size} optimized assets.`);
