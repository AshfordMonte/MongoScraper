const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/", function(req, res) {
  axios.get("https://www.pcgamer.com/news/").then(function(response) {
    var $ = cheerio.load(response.data);

    $("h3.article-name").each(function(i, element) {

      var title = $(element).text();
      var link = $(element).parent().parent().parent().parent().attr("href");
      var synopsis = $(element).parent().parent().children("p").text().slice(5,-1);
  
      var result = {};

      result.title = title;
      result.link = link;
      result.synopsis = synopsis;

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    res.render("index");
  });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});