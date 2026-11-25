/**
 * Season theme catalog. One entry per theme.
 * - label:      name shown on the admin page
 * - pieces:     falling (or rising) pieces: [image name in images/seasons/*.svg, weight]
 * - background: pictures scattered faintly in the page background
 * - count:      how many pieces are on screen at once
 * - motion:     "fall" (drops from the top) or "rise" (floats up from the bottom)
 * - flyer:      optional picture that flies straight across the screen now and then
 * How each piece moves (zigzag leaf, light snow, heavy drop) is set in js/theme.js (FEEL).
 * Colors live in css/style.css (body.theme-NAME).
 * After changing background pictures, run: python tools/build_season_tiles.py
 */
window.UllimThemeCatalog = {
  "spring": {
    "label": "봄 (벚꽃)", "motion": "fall", "count": 9,
    "pieces": [["petal", 80], ["clover", 20]],
    "background": ["petal", "clover", "plum"]
  },
  "summer": {
    "label": "여름 (물방울)", "motion": "rise", "count": 7,
    "pieces": [["bubble", 100]],
    "background": ["bubble"]
  },
  "autumn": {
    "label": "가을 (단풍)", "motion": "fall", "count": 9,
    "pieces": [["maple", 60], ["ginkgo", 40]],
    "background": ["maple", "ginkgo"]
  },
  "halloween": {
    "label": "할로윈", "motion": "fall", "count": 7,
    "pieces": [["pumpkin", 45], ["candy", 30], ["bat", 25]],
    "background": ["pumpkin", "bat", "candy"]
  },
  "winter": {
    "label": "겨울 (눈사람)", "motion": "fall", "count": 14,
    "pieces": [["snowflake", 50], ["snowdot", 50]],
    "background": ["snowman", "snowman", "snowflake"]
  },
  "christmas": {
    "label": "크리스마스 (루돌프)", "motion": "fall", "count": 12,
    "pieces": [["snowflake", 55], ["snowdot", 30], ["star", 15]],
    "background": ["wreath", "candycane", "bauble", "star"],
    "flyer": "rudolph"
  },
  "new-year": {
    "label": "새해 (복주머니)", "motion": "fall", "count": 8,
    "pieces": [["plum", 60], ["pouch", 40]],
    "background": ["pouch", "plum"]
  }
};
