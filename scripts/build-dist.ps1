$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$dist = Join-Path $root "dist"
$assetsDir = Join-Path $dist "assets\app"
$placeholderPath = Join-Path $root "public\assets\cover\cover-test.jpg"
$placeholderBase64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($placeholderPath))

New-Item -ItemType Directory -Force -Path $assetsDir | Out-Null

$esbuild = Join-Path $root "node_modules\@esbuild\win32-x64\esbuild.exe"
$tailwind = Join-Path $root "node_modules\.bin\tailwindcss.cmd"

& $esbuild `
  "src\main.jsx" `
  "--bundle" `
  "--format=esm" `
  "--splitting" `
  "--outdir=dist\assets\app" `
  "--loader:.js=jsx" `
  "--loader:.jsx=jsx" `
  "--minify"

& $tailwind `
  "-i" ".\src\index.css" `
  "-o" ".\dist\assets\app\main.css" `
  "--minify"

$html = @"
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      .ac-cover-card {
        background-image: url("data:image/jpeg;base64,$placeholderBase64") !important;
      }
    </style>
    <title>&#33261;&#27668;&#36864;&#36864;&#36864;</title>
    <script type="module" crossorigin src="/assets/app/main.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/app/main.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
"@

Set-Content -LiteralPath (Join-Path $dist "index.html") -Value $html -Encoding UTF8
