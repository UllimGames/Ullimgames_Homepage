"""Local static server. Saves the theme schedule from the admin page."""
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCHEDULE = ROOT / "js" / "theme-schedule.js"
THEMES = {"spring", "summer", "autumn", "halloween", "christmas", "new-year", "winter"}
PORT = 8765


def valid_schedule(data):
    if not isinstance(data, dict):
        return False
    manual = data.get("manual", None)
    if manual is not None and manual not in THEMES:
        return False
    months = data.get("months")
    if not isinstance(months, dict):
        return False
    for month in range(1, 13):
        theme = months.get(str(month))
        if theme not in THEMES:
            return False
    return True


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        if self.path.split("?", 1)[0] != "/api/theme-schedule":
            self.send_error(404)
            return
        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0 or length > 20000:
            self.send_error(400)
            return
        try:
            data = json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self.send_error(400)
            return
        if not valid_schedule(data):
            self.send_error(400)
            return
        clean = {
            "manual": data.get("manual"),
            "months": {str(month): data["months"][str(month)] for month in range(1, 13)},
        }
        text = "window.UllimThemeSchedule = " + json.dumps(clean, ensure_ascii=False, indent=2) + ";\n"
        SCHEDULE.write_text(text, encoding="utf-8")
        body = b'{"ok":true}'
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    import os

    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print("http://127.0.0.1:%s/" % PORT)
    server.serve_forever()
