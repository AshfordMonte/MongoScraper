var express = require("express");

var router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

router.get("/", function(req, res) {
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

module.exports = router;