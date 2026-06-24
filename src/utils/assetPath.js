export function assetPath(path) {
  const cleanPath = path.replace(/^\/+/, "");
  const baseUrl = import.meta.env?.BASE_URL || "/";
  return `${baseUrl}${cleanPath}`;
}
