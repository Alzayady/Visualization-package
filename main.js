const req = require("request");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const partuals = path.join(__dirname, "views/partials");
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
hbs.registerPartials(partuals);

app.get("", (req, res) => {
  res.render("home");
});

app.get("/BST", (req, res) => {
  res.render("BST");
});
app.get("/heap", (req, res) => {
  res.render("heap");
});

app.listen(port, () => {
  console.log("connected");
});
