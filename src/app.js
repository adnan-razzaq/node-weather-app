const express = require("express");
const path = require("path");
var hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forecast");
const { query } = require("express");
const forecast = require("../../weather-app/utils/forecast");

//path manipulation
/* console.log(__dirname);
console.log(path.join(__dirname, "../public"));

console.log(__filename); */

/* PATHS */
const directoryPath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

const app = express();

//handlebars setup
app.set("view engine", "hbs");
//setting relative path views location
app.set("views", viewspath);

hbs.registerPartials(partialpath);

//cutomize server
//static files
app.use(express.static(directoryPath));

/* route dynamic*/

app.get("/", (req, res) => {
  res.render("index", { title: "weather App", name: "Adnan" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Adnan" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Please contact us for any issue.",
    title: "help",
    name: "adnan",
  });
});
/* Home route */
//will not run because at line 15
/* app.get("/", (req, res) => {
  res.send("Hello world");
}); */

/* help route */
// app.get("/help", (req, res) => {
//   res.send("help page");
// });

/* about route */
// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

/* weather route  static*/
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must provide a location" });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }

        res.send({
          forcast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );

  /*  res.send({ forecast: "50", location: "NewYork", address: req.query.address }); */
});

/* app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "you must provide a search term" });
  }

  res.send({ products: [] });
}); */

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Adnan",
    errorMessage: "help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Adnan",
    errorMessage: "Page not found",
  });
});
app.listen(3000, console.log("server is running at port 3000"));
