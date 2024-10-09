// MODULES
const http = require("http");
const url = require("url");
const fs = require("fs");

const prepareVegesList = require("./modules/prepareVegesList");
const prepareVegeDetails = require("./modules/prepareVegeDetails");

// VARIABLES
const htmlPageNotFound = fs.readFileSync("./htmls/pageNotFound.html", "utf-8");
const htmlIndex = fs.readFileSync("./index.html", "utf-8");
const farmDataJson = fs.readFileSync("./data/appData/data.json", "utf-8");
const farmDataObj = JSON.parse(farmDataJson);
const homePageHtml = fs.readFileSync("./htmls/homePageHtml.html", "utf-8");
const htmlVegesListElement = fs.readFileSync(
  "./htmls/htmlVegesListElement.html",
  "utf-8"
);
const htmlVegeDetails = fs.readFileSync(
  "./htmls/htmlVegeDetails.html",
  "utf-8"
);

// ROUTING
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // DIVIDER
  if (pathname === "/" || pathname === "/home") {
    // 1 : prepare a markup list
    const allVegeLisMarkUp = farmDataObj
      .map((val) => prepareVegesList(val, htmlVegesListElement))
      .join("");

    // 2 : replace teh above markup with place holder
    let finalMakUp = homePageHtml.replace("{%VEGESLITS%}", allVegeLisMarkUp);

    // 4 : replace in index.html
    output = htmlIndex.replace("{%REPLACE%}", finalMakUp);

    // 5 : prepare header
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    // 6 : send response
    res.end(output);
  }
  // DIVIDER
  else if (pathname === "/vegeDetails") {
    // 1 : get vegeName
    const { vegeName } = query;

    // 2 : get the concerned object out of the array
    const dataVegeDetails = farmDataObj.find(
      (val) => val.productName === vegeName
    );

    // 3 : prepare a markup
    const markup = prepareVegeDetails(dataVegeDetails, htmlVegeDetails);

    // 4 : replace it in the index.html
    const output = htmlIndex.replace("{%REPLACE%}", markup);

    //  : prepare header
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    //  : send response
    res.end(output);
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
