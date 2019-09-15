//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let items = [];
let workItems = [];

app.get("/", function(req, res) {

  let day = date();

  res.render("lists", {
    listTitle: day,
    newItem: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("lists", {
    listTitle: "Work List",
    newItem: workItems
  });
});

app.listen(3000, function(req, res) {
  console.log("server has been started");
});
