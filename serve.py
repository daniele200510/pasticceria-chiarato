"""Static dev server senza cache: il browser ricarica sempre CSS/JS/foto aggiornati."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, test


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    test(partial(NoCacheHandler), port=4173, bind="127.0.0.1")
