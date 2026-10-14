# Homepage game asset specs

Owner-facing reference. Agents: use when validating files before wiring the site.

## Folder layout

```
images/
  games/
    {game-id}/
      cover.jpg          # required for polished cards
      icon.png           # optional 1:1
  hero/
    {game-id}-slide.mp4  # optional main visual
  cta-{game-id}.png      # optional seasonal floating CTA (transparent)
games/{game-id}/         # WebGL build (if web play)
play/{game-id}/          # play wrapper page (if web play)
```

## Images

| Asset | Ratio | Recommended size | Format | Max size |
|-------|-------|------------------|--------|----------|
| Main cover | 16:9, subject centered | 1920×1080 | JPG/PNG | ~1 MB |
| Small cover | 1:1, subject centered | 1200×1200 | JPG/PNG | ~800 KB |
| Banner cover | 6:1 | 1920×320 | JPG/PNG | ~800 KB |
| App icon | 1:1 | 512×512 | PNG | ~200 KB |
| Seasonal CTA character | square, transparent | 512–1024 px | PNG | ~500 KB |

Cover tips: keep the subject in the center. A solid caption bar covers the bottom, so do not put important art or words there.

## Hero video (optional)

| Field | Value |
|-------|-------|
| Length | 8–12 seconds, seamless loop |
| Aspect | 16:9 |
| Resolution | 1920×1080 |
| Format | MP4 (H.264) |
| Audio | muted / none |
| File size | ≤15 MB preferred |

Path: `images/hero/{game-id}-slide.mp4`

## Copy fields

| Field | Limit | Used on |
|-------|-------|---------|
| Display name | — | card, menus |
| One-line description | ~40 Korean chars | `.game-panel-copy` |

## WebGL build (if applicable)

Unity WebGL → `games/{game-id}/`

- Compression Format: **Disabled** (GitHub Pages)
- After copy: verify `<base href="/games/{game-id}/">` in `index.html`
- Build files live as `Build/Build.*` next to `index.html` (no nested `Build/Build/`)

## Owner send checklist (minimal)

| # | Item | 한 줄 설명 |
|---|------|-----------|
| 1 | Game ID | 폴더 이름용 영문 (`night-tour`) |
| 2 | Korean name | 화면에 보이는 게임 이름 |
| 3 | One-line intro | 카드 한 줄 소개 |
| 4 | Status + platform + URL | 웹/스토어/준비중 + **정확한** 링크 |
| 5 | `cover.jpg` / `cover.png` | 카드 배경 이미지 |
| 6 | Optional assets | 히어로 MP4/GIF, 아이콘, CTA 그림, WebGL 폴더 |
