const path = require("path");
const express = require("express");
const hbs = require("hbs");

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

const app = express();

const port = process.env.PORT || 3000;
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicPath));

app.get("", (req, resp) => {
  resp.render("index", {
    title: "Weather APP",
    name: "Nilesh Bankar",
  });
});
app.get("/about", (req, resp) => {
  resp.render("about", {
    title: "About",
    name: "Nilesh Bankar",
  });
});

app.get("/help", (req, resp) => {
  resp.render("help", {
    title: "Help",
    name: "Nilesh Bankar",
  });
});

app.get("/weather", (req, resp) => {
  if (!req.query.address) {
    return resp.send({
      error: "You must provide address to fetch data",
    });
  }
  resp.send({
    Forecast: "Weather",
    Location: "Pune",
    address: req.query.address,
  });
});

app.get("*", (req, resp) => {
  resp.render("404", {
    title: "404",
    errorMessage: "404 ,Page you are looking does not exist",
    name: "Nilesh Bankar",
  });
});
// app.get("", (req, resp) => {
//   resp.send("Hello world! It is my first attempt on node.js express server");
// });

// app.get("/about", (req, resp) => {
//   resp.send("I am Nilesh Bankar, software engineer");
// });

// app.get("/help", (req, resp) => {
//   resp.send("help");
// });

app.get("/weather", (req, resp) => {
  resp.send({ location: "Pune", forecast: "Its raining" });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
