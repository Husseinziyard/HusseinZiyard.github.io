(function () {
  // AOS
  if (window.AOS) {
    AOS.init();
  }

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

