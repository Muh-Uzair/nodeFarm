// MODULES
const http = require("http");
const url = require("url");
const fs = require("fs");

// VARIABLES
const htmlPageNotFound = fs.readFileSync("./htmls/pageNotFound.html", "utf-8");
const htmlIndex = fs.readFileSync("./index.html", "utf-8");
const farmDataJson = fs.readFileSync("./data/appData/data.json", "utf-8");
const homePageHtml = fs.readFileSync("./htmls/homePageHtml.html", "utf-8");
const htmlVegesListElement = fs.readFileSync(
  "./htmls/htmlVegesListElement.html",
  "utf-8"
);

// ROUTING
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  // DIVIDER
  if (pathname === "/" || pathname === "/home") {
    // 1 : prepare a markup from concerned file
    const markupVegesListElement = `${htmlVegesListElement}`;

    // 2 : replace teh above markup with place holder
    let finalMakUp = homePageHtml.replace(
      "{%VEGESLITS%}",
      markupVegesListElement
    );

    // 4 : replace in index.html
    output = htmlIndex.replace("{%REPLACE%}", finalMakUp);

    // 3 : prepare header
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    // 4 : send response
    res.end(output);
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
      "Content-type": "application/json",
    });
    res.end(farmDataJson);
  }
  // DIVIDER 404 route
  else {
    // 1 ; prepare markup from the html
    const markup = `${htmlPageNotFound}`;

    // 2 : replace it in the index.html
    const output = htmlIndex.replace("{%REPLACE%}", markup);

    // 3 : prepare response header
    res.writeHead(404, {
      "Content-type": "text/html",
    });

    // 4 : prepare the response
    res.end(output);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is listening");
});
