# Ullim Games homepage design guide

Content stays. The look can be rebuilt. Seasons change the skin only.

## Voice

Bright paper, one ink color, gothic type (Do Hyeon for titles, Malgun Gothic for body). Real game pictures stay large. The games block is one main tile, two square tiles, and one upcoming banner. Sharp edges, a 1px line between tiles, and a solid caption bar. No rounded cards.

## Do not

Heavy gradients, Lucide-style icons, shadows on everything, emoji, three identical intro cards, rainbow palettes, glass blur, em dashes in new copy, generic UI fonts, bento grids, fake terminal windows, pricing tiers, checkmark feature lists, pages with no real game visual, rounded corners.

## Themes

`js/theme-schedule.js` maps each month to a theme. `js/theme.js` applies the current month unless `manual` is set.

Themes: `spring`, `summer`, `autumn`, `halloween`, `christmas`, `new-year`, `winter`.

Change the live file from the admin page (`admin/index.html`) while the local server in `tools/dev_server.py` is running. On GitHub Pages, save stays in that browser only until the file is published.

Each theme: background color, optional transparent image in `images/seasons/`, and one motion.

Fruit Valley floating CTA stays the game button. It is not the company theme.
