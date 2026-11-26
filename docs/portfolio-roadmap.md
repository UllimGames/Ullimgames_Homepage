# Portfolio roadmap

Items to add to `portfolio.html` later. Content always comes from the CEO; ask before writing copy.

## Planned entries (target: end of December 2026)

| ID | Name | Engine | Released? | Purpose |
|----|------|--------|-----------|---------|
| `project-ur` | Project UR | Unreal | No (showcase only) | Show Unreal development ability. A fast-paced gameplay video, edited for the main hero; the portfolio card uses one still capture, not a GIF. |
| `project-xr` | Project XR | Unity (VR) | No (showcase only) | Show that we can build VR games and call AI from inside a game. |

## Current status

| ID | Name | Tier | Status |
|----|------|------|--------|
| `night-tour` | Knight's Tour | Main | Released (Google Play, Toss) |
| `charge-drive` | Charge Drive | Main | Released (Google Play, Toss) |
| `project-pz` | Puzzling Together (Project PZ) | Main | In preparation; 3D friendslop puzzle, small online co-op, Steam. Shown as "준비 중 · 2027년 상반기 출시 예정" |
| `fruit-valley` | Fruit Volley | Other projects | Unity WebGL, badge "이벤트 참가작" (Unity summer challenge), tech notes only |

Full game list lives on `/games.html` (one section per game, id = game id). Header and footer game links jump to those ids.
The floating "플레이 공간" button (footer partial) leads to `/play/`.

Main page "게임소개" shows the four main titles only (Knight's Tour, Charge Drive, Project Latte, Puzzling Together).
Web games live on the hub `/play/` (one `.ph-card` each, with phone/PC device icons) and get their own page `/play/{id}/` copied from `play/fruit-valley/`.

| `project-latte` | Project Latte | Main | In preparation; latte-art mobile game for Google Play and Toss. Placeholder art until a concept image exists |

UR and XR go under "그 밖의 프로젝트" (Other projects) as `pf-mini` cards, each with a `pf-badge` label.

## Rules

- Screenshots are required for every card (in-game or concept shot). Put them in `images/games/{id}/`.
- Use tags (#Unity, #AI 연동 …) instead of skill bars.
- Achievements section stays empty until there is a real award or result.
- Hero motion: use a short muted MP4, not a GIF.
