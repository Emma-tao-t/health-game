import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import autoprefixer from "autoprefixer";
import { build } from "esbuild";
import postcss from "postcss";
import tailwindcss from "tailwindcss";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const dist = path.join(root, "dist");
const appAssets = path.join(dist, "assets", "app");

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(appAssets, { recursive: true });

await build({
  entryPoints: [path.join(root, "src", "main.jsx")],
  bundle: true,
  format: "esm",
  splitting: true,
  outdir: appAssets,
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
  },
  minify: true,
});

const cssSource = await fs.readFile(path.join(root, "src", "index.css"), "utf8");
const cssResult = await postcss([
  tailwindcss({
    content: [
      path.join(root, "index.html"),
      path.join(root, "src", "**", "*.{js,jsx}"),
    ],
  }),
  autoprefixer(),
]).process(cssSource, {
  from: path.join(root, "src", "index.css"),
  to: path.join(appAssets, "main.css"),
});

await fs.writeFile(path.join(appAssets, "main.css"), cssResult.css);

const placeholder = await fs.readFile(
  path.join(root, "public", "assets", "cover", "cover-test.jpg"),
);
const placeholderBase64 = placeholder.toString("base64");
const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      .ac-cover-card {
        background-image: url("data:image/jpeg;base64,${placeholderBase64}") !important;
      }
    </style>
    <title>臭气退退退</title>
    <script type="module" crossorigin src="/assets/app/main.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/app/main.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

await fs.writeFile(path.join(dist, "index.html"), html);
