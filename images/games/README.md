# Game homepage assets

Drop files here before asking the agent to wire a new or updated game.

## Folder layout

```
images/games/{game-id}/
  cover.jpg     # required — showcase card background
  icon.png      # optional — 512×512 square

images/hero/{game-id}-slide.mp4   # optional — main visual swiper

images/cta-{game-id}.png          # optional — seasonal floating CTA (transparent PNG)
```

## Current game IDs

| ID | Name | Slot |
|----|------|------|
| `night-tour` | 나이트 투어 | 메인 (출시) |
| `charge-drive` | 차지드라이브 | 작은칸 (출시, 그림 없음) |
| `fruit-valley` | 후르츠발리 | 작은칸 (웹) |
| `project-pz` | 프로젝트 PZ | 배너 (출시 예정) |

## Specs

| Slot | Image | Copy |
|------|--------|------|
| 메인 | 16:9, 1920×1080, JPG/PNG, 가운데가 중요 | 40자 안쪽 |
| 작은칸 | 1:1, 1200×1200, JPG/PNG | 22자 안쪽 |
| 배너 | 6:1, 1920×320, JPG/PNG | 28자 안쪽 |

웹으로 하는 출시 게임은 작은칸에 넣습니다. 출시 예정은 배너만 씁니다.

Agent skill: `.cursor/skills/add-homepage-game/SKILL.md`
