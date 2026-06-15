import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("dist");
const preferredPort = Number(process.env.PORT || 5174);
const host = "127.0.0.1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function fileFromRequest(url) {
  const pathname = decodeURIComponent(new URL(url, `http://${host}`).pathname);
  const requested = normalize(join(root, pathname));
  if (!requested.startsWith(root)) return null;
  if (existsSync(requested) && statSync(requested).isFile()) return requested;
  if (existsSync(requested) && statSync(requested).isDirectory()) {
    const indexFile = join(requested, "index.html");
    if (existsSync(indexFile)) return indexFile;
  }
  return join(root, "index.html");
}

const server = createServer((req, res) => {
  const filePath = fileFromRequest(req.url || "/");
  if (!filePath || !existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  createReadStream(filePath).pipe(res);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    server.listen(0, host);
    return;
  }
  throw error;
});

server.on("listening", () => {
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : preferredPort;
  console.log(`臭气退退退已启动：http://${host}:${port}`);
});

server.listen(preferredPort, host);
