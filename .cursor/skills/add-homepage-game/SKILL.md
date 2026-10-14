---
name: add-homepage-game
description: Adds or updates a game on the Ullim Games static homepage — assets, showcase card, menus, store/play links, optional WebGL and seasonal CTA. Use when the owner ships a game, asks to add/update game intro on the homepage, mentions game pipeline, cover images, hero video, Google Play/Steam links, or WebGL play pages.
---

# Add Homepage Game

Read [asset-specs.md](asset-specs.md) for exact sizes and formats.

## Before editing

1. **Plan first → wait for approval → then edit** (owner is a beginner; explain in Korean).
2. Collect the owner intake below. Missing store URL → ask; never guess Play/Steam links.
3. Commit/push only when explicitly asked.

## Owner intake (copy checklist to chat)

When the owner says “게임 출시했어 / 파이프라인 알려줘 / 홈페이지에 올려줘”, **read this skill first**, then ask only for the slot they are filling. Do not start editing until the plan is approved. Do not invent copy, covers, or store URLs.

Showcase slots, in `index.html` `#games`:

| Slot | Class | Who goes here |
|------|--------|----------------|
| Main | `game-panel--main` | One released flagship. Now: Night Tour |
| Small | `game-panel--small` | Other released games, including web games. Now: Charge Drive, Fruit Valley |
| Banner | `game-panel--banner` | Upcoming only. Now: Project PZ |

Released games do not go on the banner. Upcoming games do not go in the main or small slots. Web games sit in a small slot with the tag `웹`. There is no roadmap section.

```
칸: 메인 / 작은칸 / 배너
  → 메인=대표 출시 게임 1개, 작은칸=다른 출시 게임(웹 포함), 배너=출시 예정만

Game ID: night-tour 같은 영문 별명
  → 폴더 이름. 띄어쓰기는 하이픈

한글 이름:
  → 화면에 보이는 이름

한 줄 소개:
  → 메인 40자 안쪽 / 작은칸 22자 안쪽 / 배너 28자 안쪽
  → 없으면 문장을 지어내지 말고 이름만 둔다

상태: 구글플레이 출시 / 웹 플레이 / 스팀 / 출시 예정

링크:
  → 출시 게임은 스토어 또는 /play/ 주소가 있어야 칸이 눌린다
  → 주소가 없으면 링크를 만들지 않는다

그림:
  → 메인: 가로 16:9, 1920×1080, JPG 또는 PNG, 1MB 안쪽. 중요한 대상은 가운데
  → 작은칸: 정사각 1:1, 1200×1200, JPG 또는 PNG, 800KB 안쪽. 대상은 가운데
  → 배너: 가로로 긴 6:1, 1920×320, JPG 또는 PNG, 800KB 안쪽
  → 파일 위치: images/games/{id}/cover.jpg (또는 .png)
  → 그림이 없으면 가짜 화면을 만들지 말고 글자 칸으로 둔다
```

## Where things go on the site

| Surface | File / location | Notes |
|---------|-----------------|-------|
| Store/play URLs | `js/games-config.js` | Single source; wire with JS classes like `.js-night-tour-store` |
| Game showcase card | `index.html` → `.games-showcase-grid` | Tag, name, copy, CTA; link or `<div class="game-panel--soon">` |
| Panel background | `css/style.css` → `.game-panel-media--{id}` | Prefer `url("../images/games/{id}/cover.jpg")` over gradient-only |
| Header / sidebar / footer menus | `index.html` | Match card link behavior |
| Main hero swiper | `index.html` → `.mainSwiper .swiper-wrapper` | Optional `{game-id}-slide.mp4` in `images/hero/` |
| Seasonal CTA (bottom-left) | `index.html` bottom `#…Cta` + `css/style.css` `.play-cta--*` | One seasonal CTA only; company colors ≠ Fruit Valley summer palette |
| WebGL build | `games/{id}/` | Unity output; see `games/fruit-valley/README.md` |
| Web play page | `play/{id}/index.html` | iframe + ranking scaffold; **ranking data OFF** until server exists |
| Game assets drop zone | `images/games/{id}/` | See `images/games/README.md` |

## Implementation steps (agent)

### A. Every game (any status)

1. Add assets under `images/games/{id}/` (at minimum `cover.jpg`).
2. Extend `window.UllimGamesConfig` in `js/games-config.js` with `{camelCaseId}Url` (or play path).
3. Place the panel in the matching slot class: `game-panel--main`, `game-panel--small`, or `game-panel--banner`.
   - **Web**: `<a href="/play/{id}/" class="game-panel game-panel--small">` + tag `is-live` “웹”
   - **Store**: `<a class="game-panel game-panel--main js-{id}-store" …>` or `--small` + tag `is-store`
   - **Upcoming banner**: `<div class="game-panel game-panel--banner game-panel--quiet">` + tag “출시 예정”
   - **No cover yet**: add `game-panel--quiet` and skip the media div
4. Add `.game-panel-media--{id}` with the cover file. No gradient fill in place of a missing picture.
5. Sync nav: header dropdown, mobile sidebar, footer “게임소개” — same href/class as card.
6. Wire config in `index.html` script: `querySelectorAll('.js-{id}-store')` → config URL (copy Night Tour pattern).

### B. WebGL branch (like Fruit Valley)

1. Owner drops Unity WebGL build into `games/{id}/` (Compression **Disabled**).
2. Ensure `<base href="/games/{id}/">` in `games/{id}/index.html` after each rebuild.
3. Create `play/{id}/index.html` from `play/fruit-valley/index.html` template; keep ranking UI scaffold, data OFF.
4. Card + menus point to `/play/{id}/`.
5. Optional seasonal CTA only if owner designates this game as the current seasonal promo.

### C. Hero slide (optional)

Add inside `.swiper-wrapper`:

```html
<div class="swiper-slide">
  <video src="images/hero/{id}-slide.mp4" autoplay loop muted playsinline class="responsive-media"></video>
</div>
```

Keep 8–12 s, muted, 16:9, ≤15 MB.

## Tag / copy conventions

| Status | Tag class | Tag text (KO/EN mix OK) | CTA |
|--------|-----------|---------------------------|-----|
| Web live | `is-live` | 웹 | 플레이하기 |
| Google Play | `is-store` | Google Play | 스토어에서 받기 |
| Steam | `is-store` | Steam | 스토어에서 받기 |
| Upcoming banner | (default) | 출시 예정 | none |

Copy length follows the slot: main ~40 Korean characters, small ~22, banner ~28.

## Do not touch (unless asked)

- Footer identity block (상호, 대표, 사업자등록번호, etc.)
- SNS links
- Invent legal text; keep privacy/terms aligned (no membership, ranking not live)
- Do not enable live ranking without server
- Do not reintroduce merged hero/about layout experiments without approval

## Known game IDs

`night-tour` (main), `charge-drive` (small, cover still missing), `fruit-valley` (small, web), `project-pz` (banner). New games get new kebab-case IDs.

## After changes

Tell the owner in Korean: what changed, where assets live, and anything still missing (e.g. real Play Store URL).
