// Imports
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");

// Inits
const app = express();

// Standard
app.disable("x-powered-by");
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Begin Web Server
app.listen(process.env.port, () => {
  console.log("Running");
});

loadRoutes();


function loadRoutes() {
  const routesPath = path.join(__dirname, "./routes");

  fs.readdir(routesPath, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((filename) => {
      const route = require(path.join(routesPath, filename));

      const routePath = filename === "ticket.js" ? "/" : `/${filename.slice(0, -3)}`;

      try {
        app.use(routePath, route);
        console.log(`${routePath}`);
      } catch (error) {
        console.log(
          `Error occured with the route "${filename}":\n\n${error} Ignoring continuing`
        );
      }
    });
  });

  return this;
}
