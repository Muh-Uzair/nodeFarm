const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  // DIVIDER
  if (pathname === "/" || pathname === "/home") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<p>Home pg</p>");
  }
  // DIVIDER
  else if (pathname === "/vegetableDetails") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<p>Details PG</p>");
  }
  // DIVIDER
  else if (pathname === "/farmData") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<p>Farm Data</p>");
  }
  // DIVIDER
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });

    const markup = "<p>Page not found</p>";

    res.end(markup);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is listening");
});
