"""Build the faint background tile for each season theme.

Reads js/theme-catalog.js ("background" list) and the drawings in images/seasons/*.svg,
then writes images/seasons/{theme}-tile.svg (a 480x480 repeating tile).

    python tools/build_season_tiles.py
"""
import json
import random
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEASONS = ROOT / "images" / "seasons"
TILE = 480
GRID = 3          # 3 x 3 cells per tile, one motif per cell
OPACITY = 0.26


def read_catalog():
    text = (ROOT / "js" / "theme-catalog.js").read_text(encoding="utf-8")
    body = text[text.index("{"): text.rindex("}") + 1]
    return json.loads(body)


def inner_svg(name):
    text = (SEASONS / f"{name}.svg").read_text(encoding="utf-8")
    return re.search(r"<svg[^>]*>(.*)</svg>", text, re.S).group(1).strip()


def build_tile(theme, spec):
    rng = random.Random(theme)  # same output every run
    cell = TILE / GRID
    parts = []
    for row in range(GRID):
        for col in range(GRID):
            name = rng.choice(spec.get("background") or [n for n, _ in spec["pieces"]])
            size = rng.uniform(30, 42)
            x = col * cell + rng.uniform(0.15, 0.85) * (cell - size)
            # Offset every other row so motifs do not line up in a grid.
            y = row * cell + rng.uniform(0.15, 0.85) * (cell - size)
            if row % 2:
                x = (x + cell / 2) % (TILE - size)
            angle = rng.uniform(-35, 35)
            cx, cy = x + size / 2, y + size / 2
            parts.append(
                f'<g transform="rotate({angle:.0f} {cx:.1f} {cy:.1f})">'
                f'<svg x="{x:.1f}" y="{y:.1f}" width="{size:.1f}" height="{size:.1f}" viewBox="0 0 64 64">'
                f"{inner_svg(name)}</svg></g>"
            )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{TILE}" height="{TILE}" viewBox="0 0 {TILE} {TILE}">'
        f'<g opacity="{OPACITY}">{"".join(parts)}</g></svg>\n'
    )


def main():
    for theme, spec in read_catalog().items():
        out = SEASONS / f"{theme}-tile.svg"
        out.write_text(build_tile(theme, spec), encoding="utf-8", newline="\n")
        print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024 + 1} KB)")


if __name__ == "__main__":
    main()
