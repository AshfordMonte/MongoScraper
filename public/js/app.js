$(document).on("click", ".btn-primary", function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .then(function (data) {
      // console.log(data);
    });
})

$(document).on("click", ".btn-danger", function () {
  console.log("Clearing!");
  $.ajax({
    method: "GET",
    url: "/clear"
  })
    .then(function (data) {
      // console.log(data);
    });
})