# Ullim Games homepage design guide

Content stays. The look can be rebuilt. Seasons change the skin only.

## Voice

Bright paper, one ink color, gothic type (Do Hyeon for titles, Pretendard for body). Real game pictures stay large. The games block is one main tile, two square tiles, and one upcoming banner. Sharp edges, a 1px line between tiles, and a solid caption bar. No rounded cards.

## Do not

Heavy gradients, Lucide-style icons, shadows on everything, emoji, three identical intro cards, rainbow palettes, glass blur, em dashes in new copy, generic UI fonts, bento grids, fake terminal windows, pricing tiers, checkmark feature lists, pages with no real game visual, rounded corners.

## Themes

- `js/theme-catalog.js`: what each theme looks like (label, falling pieces, background pictures, how many, fall or rise, optional flyer such as Rudolph).
- `js/theme-schedule.js`: which theme each month uses. Change it from the admin page (`/admin/`) while `python tools/dev_server.py` is running, then commit and push.
- `js/theme.js`: applies this month's theme (always the calendar; no fixed theme). Motion styles: leaves zigzag, snow drifts lightly, heavy pieces drop with a small wobble, Rudolph flies straight across.
- Art: one flat style, drawn as SVG in `images/seasons/{piece}.svg`. The faint page background is `{theme}-tile.svg`, built from each theme's `background` list by `python tools/build_season_tiles.py`.
- Preview: the admin page buttons switch the effect on that page only. Nothing is saved.

Themes: `spring`, `summer`, `autumn`, `halloween`, `winter`, `christmas`, `new-year`.

Fruit Valley floating CTA stays the game button. It is not the company theme.
