#!/usr/bin/env python3
"""Serve the static Expo web export so Cursor Preview can open it."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parents[1] / "dist"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path != "/" and not Path(path.lstrip("/")).suffix:
            html = ROOT / f"{path.lstrip('/')}.html"
            if html.is_file():
                self.path = f"/{html.name}"
        return super().do_GET()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "43147"))
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"Lemonade Stand on http://127.0.0.1:{port}", flush=True)
    server.serve_forever()
