$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = "c:\Apps\App Especialidades\Especialidades"
$itemsDir = Join-Path $root "public\specialties\items"

function Get-IconForSpecialtyId {
  param([string]$id)

  $map = @(
    @{ k = "felinos|gatos|gato"; e = "CAT" },
    @{ k = "aves|pajar|ornit"; e = "AVE" },
    @{ k = "mamifer"; e = "MAM" },
    @{ k = "peces|pesca"; e = "PEZ" },
    @{ k = "reptil|serp|anfib"; e = "REP" },
    @{ k = "insect|abej|hormig|mariposa"; e = "INS" },
    @{ k = "flora|plantas|botan|arbol|jardin|hortic|flor"; e = "FLR" },
    @{ k = "ecolog|ambiente|recicl|conserv"; e = "ECO" },
    @{ k = "campamento|camping|aire-libre|mochila|sender|caminata"; e = "CMP" },
    @{ k = "nudos|amarres|cuerda"; e = "NUD" },
    @{ k = "orientacion|brujula|cartografia|mapa"; e = "MAP" },
    @{ k = "rescate|emergencia|desastre|primeros-auxilios"; e = "AUX" },
    @{ k = "salud|nutric|higiene|medic|enfermedad|oral"; e = "SAL" },
    @{ k = "cocina|culin|pan|alimentos|comidas"; e = "COC" },
    @{ k = "costura|textil|sastr|confeccion"; e = "TEL" },
    @{ k = "carpinter|ebanist|albanil|construcc"; e = "OBR" },
    @{ k = "electric|electron|mecanic|motor|automotriz|bicic"; e = "TEC" },
    @{ k = "internet|web|software|comput|codigo|informat"; e = "WEB" },
    @{ k = "audio|video|fotografia|periodismo|imprenta|blogs"; e = "MED" },
    @{ k = "musica|guitarr|arte|titer|dramat"; e = "ART" },
    @{ k = "biblia|evangel|mision|adoracion|predicar|discipul"; e = "BIB" },
    @{ k = "lider|servicio|comunit|adra|conflicto"; e = "SRV" },
    @{ k = "deporte|fisico"; e = "DEP" },
    @{ k = "historia|arqueolog|cultura|idioma|lengua"; e = "HIS" }
  )

  foreach ($entry in $map) {
    if ($id -match $entry.k) { return $entry.e }
  }
  return "ESP"
}

function Get-Initials {
  param([string]$id)
  $parts = @($id -split "-" | Where-Object { $_ -and $_.Length -gt 0 })
  if ($parts.Count -eq 0) { return "SP" }
  if ($parts.Count -eq 1) { return ($parts[0].Substring(0, [Math]::Min(2, $parts[0].Length))).ToUpper() }
  return (($parts[0].Substring(0, 1) + $parts[1].Substring(0, 1))).ToUpper()
}

function New-RoundedRectPath {
  param([float]$x, [float]$y, [float]$w, [float]$h, [float]$r)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diam = $r * 2
  $path.AddArc($x, $y, $diam, $diam, 180, 90)
  $path.AddArc($x + $w - $diam, $y, $diam, $diam, 270, 90)
  $path.AddArc($x + $w - $diam, $y + $h - $diam, $diam, $diam, 0, 90)
  $path.AddArc($x, $y + $h - $diam, $diam, $diam, 90, 90)
  $path.CloseFigure()
  return $path
}

function New-ColorFromHsl {
  param([double]$h, [double]$s, [double]$l)
  $h = ($h % 360 + 360) % 360
  $s = [Math]::Max(0, [Math]::Min(1, $s))
  $l = [Math]::Max(0, [Math]::Min(1, $l))
  $c = (1 - [Math]::Abs(2 * $l - 1)) * $s
  $x = $c * (1 - [Math]::Abs((($h / 60) % 2) - 1))
  $m = $l - $c / 2
  $r1 = 0; $g1 = 0; $b1 = 0
  if ($h -lt 60) { $r1 = $c; $g1 = $x; $b1 = 0 }
  elseif ($h -lt 120) { $r1 = $x; $g1 = $c; $b1 = 0 }
  elseif ($h -lt 180) { $r1 = 0; $g1 = $c; $b1 = $x }
  elseif ($h -lt 240) { $r1 = 0; $g1 = $x; $b1 = $c }
  elseif ($h -lt 300) { $r1 = $x; $g1 = 0; $b1 = $c }
  else { $r1 = $c; $g1 = 0; $b1 = $x }
  $r = [int][Math]::Round(($r1 + $m) * 255)
  $g = [int][Math]::Round(($g1 + $m) * 255)
  $b = [int][Math]::Round(($b1 + $m) * 255)
  return [System.Drawing.Color]::FromArgb(255, $r, $g, $b)
}

$svgFiles = Get-ChildItem -Path $itemsDir -Filter "*.svg" -File
$count = 0

foreach ($file in $svgFiles) {
  $id = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
  $icon = Get-IconForSpecialtyId $id
  $initials = Get-Initials $id

  $hash = 0
  foreach ($ch in $id.ToCharArray()) {
    $hash = (($hash * 31) + [int][char]$ch) % 360
  }
  $h1 = [Math]::Abs($hash % 360)
  $h2 = ($h1 + 38) % 360

  $bmp = New-Object System.Drawing.Bitmap 512, 512
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(242, 242, 242))
  $g.FillRectangle($bg, 0, 0, 512, 512)

  $c1 = New-ColorFromHsl $h1 0.72 0.58
  $c2 = New-ColorFromHsl $h2 0.72 0.42
  $rect = New-Object System.Drawing.RectangleF(18, 62, 476, 388)
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 35)
  $path = New-RoundedRectPath 18 62 476 388 150
  $g.FillPath($brush, $path)

  $hl1 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(56, 255, 255, 255))
  $hl2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(42, 255, 255, 255))
  $g.FillEllipse($hl1, 56, 90, 96, 96)
  $g.FillEllipse($hl2, 372, 332, 112, 112)

  $fontIcon = New-Object System.Drawing.Font("Segoe UI", 110, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $iconBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(245, 255, 255, 255))

  if ($icon -eq "CAT") {
    $earBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 255, 255, 255))
    $g.FillPolygon($earBrush, [System.Drawing.PointF[]]@((New-Object System.Drawing.PointF(172, 148)), (New-Object System.Drawing.PointF(210, 96)), (New-Object System.Drawing.PointF(244, 154))))
    $g.FillPolygon($earBrush, [System.Drawing.PointF[]]@((New-Object System.Drawing.PointF(340, 148)), (New-Object System.Drawing.PointF(302, 96)), (New-Object System.Drawing.PointF(268, 154))))
    $earBrush.Dispose()
  }
  $g.DrawString($icon, $fontIcon, $iconBrush, (New-Object System.Drawing.RectangleF(32, 116, 448, 220)), $sf)

  $fontLabel = New-Object System.Drawing.Font("Segoe UI", 54, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $labelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(235, 255, 255, 255))
  $g.DrawString($initials, $fontLabel, $labelBrush, (New-Object System.Drawing.PointF(208, 352)))

  $outPath = Join-Path $itemsDir "$id.png"
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

  $fontIcon.Dispose()
  $fontLabel.Dispose()
  $iconBrush.Dispose()
  $labelBrush.Dispose()
  $hl1.Dispose()
  $hl2.Dispose()
  $brush.Dispose()
  $path.Dispose()
  $bg.Dispose()
  $g.Dispose()
  $bmp.Dispose()
  $count++
}

Write-Host "Generated $count PNG files in $itemsDir"
