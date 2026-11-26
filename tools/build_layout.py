"""Copy the shared header/footer into every page and fill game links.

Edit partials/header.html or partials/footer.html (or js/games-config.js),
then run:

    python tools/build_layout.py

What it does:
1. Replaces the block between <!-- layout:NAME --> and <!-- /layout:NAME -->
   in each page with partials/NAME.html.
2. Sets href on every <a data-link="key"> from js/games-config.js, so links
   work even before JavaScript runs (search engines, slow phones).
   An empty URL removes the href; the badge stays as a plain label.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = ["index.html", "games.html", "portfolio.html", "play/index.html", "privacy.html", "terms.html"]
PARTIALS = ["header", "footer"]


def read_config():
    text = (ROOT / "js" / "games-config.js").read_text(encoding="utf-8")
    return dict(re.findall(r'(\w+)\s*:\s*"([^"]*)"', text))


def apply_partials(html, page):
    for name in PARTIALS:
        body = (ROOT / "partials" / f"{name}.html").read_text(encoding="utf-8").strip()
        pattern = re.compile(
            rf"(<!-- layout:{name} -->)(.*?)(<!-- /layout:{name} -->)", re.S
        )
        if not pattern.search(html):
            print(f"  ! {page}: missing <!-- layout:{name} --> markers, skipped")
            continue
        html = pattern.sub(lambda m: f"{m.group(1)}\n{body}\n{m.group(3)}", html)
    return html


def apply_links(html, config):
    def fix(match):
        tag = match.group(0)
        key = re.search(r'data-link="(\w+)"', tag).group(1)
        if key not in config:
            print(f"  ! unknown data-link key: {key}")
            return tag
        url = config[key]
        tag = re.sub(r'\s+href="[^"]*"', "", tag)
        if url:
            tag = tag.replace("<a ", f'<a href="{url}" ', 1)
            if url.startswith("http") and "target=" not in tag:
                tag = tag[:-1] + ' target="_blank" rel="noopener noreferrer">'
        else:
            tag = re.sub(r'\s+(target|rel)="[^"]*"', "", tag)
        return tag

    return re.sub(r'<a\b[^>]*\bdata-link="\w+"[^>]*>', fix, html)


def main():
    config = read_config()
    for page in PAGES:
        path = ROOT / page
        if not path.exists():
            continue
        before = path.read_text(encoding="utf-8")
        after = apply_links(apply_partials(before, page), config)
        if after != before:
            path.write_text(after, encoding="utf-8", newline="\n")
            print(f"updated {page}")
        else:
            print(f"unchanged {page}")


if __name__ == "__main__":
    main()
