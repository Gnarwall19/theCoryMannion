$(function () {

  console.log("ready!");

  //not right... create variable

  var x = $("#navMain").offset();
  console.log("Top: " + x.top + " Left: " + x.left);

  //look up differene btwn this format and "function literal"
  var navbarCollapse = function () {
    if ($("#navMain").offset().top > 100) {
      $("#navMain").addClass("navbar-shrink");
    } else {
      $("#navMain").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

});
