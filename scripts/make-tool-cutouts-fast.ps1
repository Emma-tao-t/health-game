Add-Type -AssemblyName System.Drawing

$code = @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class ToolCutoutMaker
{
    private static bool IsBackground(byte r, byte g, byte b, byte a)
    {
        int max = Math.Max(r, Math.Max(g, b));
        int min = Math.Min(r, Math.Min(g, b));
        return a > 0 && r >= 238 && g >= 238 && b >= 238 && (max - min) <= 18;
    }

    public static void Process(string sourcePath, string targetPath)
    {
        using (var source = new Bitmap(sourcePath))
        using (var bitmap = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb))
        using (var g = Graphics.FromImage(bitmap))
        {
            g.DrawImage(source, 0, 0, source.Width, source.Height);

            int width = bitmap.Width;
            int height = bitmap.Height;
            var rect = new Rectangle(0, 0, width, height);
            var data = bitmap.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int stride = data.Stride;
            int bytesLength = Math.Abs(stride) * height;
            byte[] bytes = new byte[bytesLength];
            Marshal.Copy(data.Scan0, bytes, 0, bytesLength);

            bool[] visited = new bool[width * height];
            Queue<int> queue = new Queue<int>();

            for (int x = 0; x < width; x++)
            {
                queue.Enqueue(x);
                queue.Enqueue((height - 1) * width + x);
            }
            for (int y = 0; y < height; y++)
            {
                queue.Enqueue(y * width);
                queue.Enqueue(y * width + width - 1);
            }

            while (queue.Count > 0)
            {
                int pos = queue.Dequeue();
                if (pos < 0 || pos >= visited.Length || visited[pos]) continue;
                visited[pos] = true;

                int x = pos % width;
                int y = pos / width;
                int offset = y * stride + x * 4;
                byte b = bytes[offset + 0];
                byte gChannel = bytes[offset + 1];
                byte r = bytes[offset + 2];
                byte a = bytes[offset + 3];

                if (!IsBackground(r, gChannel, b, a)) continue;

                bytes[offset + 3] = 0;

                if (x > 0) queue.Enqueue(pos - 1);
                if (x < width - 1) queue.Enqueue(pos + 1);
                if (y > 0) queue.Enqueue(pos - width);
                if (y < height - 1) queue.Enqueue(pos + width);
            }

            Marshal.Copy(bytes, 0, data.Scan0, bytesLength);
            bitmap.UnlockBits(data);

            Directory.CreateDirectory(Path.GetDirectoryName(targetPath));
            bitmap.Save(targetPath, ImageFormat.Png);
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing

$sourceDirs = @(
  (Join-Path $PSScriptRoot "..\public\health\right"),
  (Join-Path $PSScriptRoot "..\public\health\wrong")
)
$targetDir = Join-Path $PSScriptRoot "..\public\assets\tools-cutout"
New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

foreach ($dir in $sourceDirs) {
  Get-ChildItem -LiteralPath $dir -Filter *.png | ForEach-Object {
    $target = Join-Path $targetDir $_.Name
    [ToolCutoutMaker]::Process($_.FullName, $target)
    Write-Output "cutout: $($_.Name)"
  }
}
