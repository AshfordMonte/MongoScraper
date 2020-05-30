$(document).on("click", ".btn-primary", function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .then(function (data) {
      // console.log(data);
    });
})