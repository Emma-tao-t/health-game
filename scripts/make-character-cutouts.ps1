$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

Add-Type -TypeDefinition @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

public class CutoutMaker {
  public static void Make(string input, string output) {
    using (var src0 = new Bitmap(input)) {
      using (var src = new Bitmap(src0.Width, src0.Height, PixelFormat.Format32bppArgb)) {
        using (var g = Graphics.FromImage(src)) g.DrawImage(src0, 0, 0, src0.Width, src0.Height);
        int w = src.Width, h = src.Height;
        Color c1 = src.GetPixel(2, 2), c2 = src.GetPixel(w - 3, 2), c3 = src.GetPixel(2, h - 3), c4 = src.GetPixel(w - 3, h - 3);
        int br = (c1.R + c2.R + c3.R + c4.R) / 4;
        int bg = (c1.G + c2.G + c3.G + c4.G) / 4;
        int bb = (c1.B + c2.B + c3.B + c4.B) / 4;
        bool[] seen = new bool[w * h];
        Queue<int> q = new Queue<int>();
        Action<int, int> push = (x, y) => {
          if (x >= 0 && x < w && y >= 0 && y < h) {
            int i = y * w + x;
            if (!seen[i]) {
              seen[i] = true;
              q.Enqueue(i);
            }
          }
        };
        for (int x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
        for (int y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
        while (q.Count > 0) {
          int i = q.Dequeue();
          int x = i % w;
          int y = i / w;
          Color p = src.GetPixel(x, y);
          if (!IsBackground(p, br, bg, bb)) continue;
          push(x + 1, y);
          push(x - 1, y);
          push(x, y + 1);
          push(x, y - 1);
        }
        int minX = w, minY = h, maxX = 0, maxY = 0;
        using (var dst = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
          for (int y = 0; y < h; y++) {
            for (int x = 0; x < w; x++) {
              int i = y * w + x;
              Color p = src.GetPixel(x, y);
              if (seen[i] && IsBackground(p, br, bg, bb)) {
                dst.SetPixel(x, y, Color.FromArgb(0, p.R, p.G, p.B));
              } else {
                dst.SetPixel(x, y, p);
                if (p.A > 10) {
                  if (x < minX) minX = x;
                  if (y < minY) minY = y;
                  if (x > maxX) maxX = x;
                  if (y > maxY) maxY = y;
                }
              }
            }
          }
          int pad = 18;
          minX = Math.Max(0, minX - pad);
          minY = Math.Max(0, minY - pad);
          maxX = Math.Min(w - 1, maxX + pad);
          maxY = Math.Min(h - 1, maxY + pad);
          Rectangle crop = new Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);
          using (var final = dst.Clone(crop, PixelFormat.Format32bppArgb)) {
            Directory.CreateDirectory(Path.GetDirectoryName(output));
            final.Save(output, ImageFormat.Png);
          }
        }
      }
    }
  }

  static bool IsBackground(Color p, int br, int bg, int bb) {
    int dr = p.R - br, dg = p.G - bg, db = p.B - bb;
    double dist = Math.Sqrt(dr * dr + dg * dg + db * db);
    int max = Math.Max(p.R, Math.Max(p.G, p.B));
    int min = Math.Min(p.R, Math.Min(p.G, p.B));
    bool nearCorner = dist < 95 && p.R > 205 && p.G > 198 && p.B > 185;
    bool pale = p.R > 226 && p.G > 220 && p.B > 205 && (max - min) < 42;
    return nearCorner || pale;
  }
}
"@ -ReferencedAssemblies System.Drawing

$srcDir = Join-Path (Get-Location) "public\assets\characters"
$outDir = Join-Path (Get-Location) "public\assets\characters-cutout"
New-Item -ItemType Directory -Force $outDir | Out-Null

Get-ChildItem $srcDir -Filter *.png | ForEach-Object {
  $out = Join-Path $outDir $_.Name
  [CutoutMaker]::Make($_.FullName, $out)
  Write-Output "cutout $($_.Name)"
}
