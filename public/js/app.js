var articleContainer = $(".article-container");
$(document).on("click", ".btn-primary", function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
})

$(document).on("click", ".btn-danger", function () {
  console.log("Clearing!");
  $.get("/clear").then(function () {
    console.log("Front end clear");
    articleContainer.empty();
  })
})