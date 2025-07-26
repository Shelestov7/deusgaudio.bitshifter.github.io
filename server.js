const http = require("http");
const fs = require("fs");
const path = require("path");

const base = path.join(__dirname, "io.site");
const PORT = 3000;

http
  .createServer((req, res) => {
    let file = req.url === "/" ? "/main.html" : req.url;
    let filepath = path.join(base, decodeURIComponent(file));

    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("404 Not Found");
      } else {
        let ext = path.extname(filepath).toLowerCase();
        let type =
          {
            ".html": "text/html",
            ".js": "application/javascript",
            ".wasm": "application/wasm",
            ".css": "text/css",
            ".ttf": "font/ttf",
            ".png": "image/png",
            ".jpg": "image/jpeg",
          }[ext] || "application/octet-stream";

        res.writeHead(200, { "Content-Type": type });
        res.end(data);
      }
    });
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
