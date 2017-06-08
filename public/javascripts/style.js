
// navbar code

var header = document.getElementById("header");
var navBar = document.getElementById("navbar");

var navbarHeight = navBar.offsetHeight;
var headerHeight = header.offsetHeight;

// header.style.height = screen.height.navbarHeight;

function initParallax() {
  if (window.pageYOffset > headerHeight) {
    navBar.classList.add("fixed-nav");
    navBar.style.position = "fixed";
    navBar.style.top = 0;
    navBar.style.transition = "all 1s"
    navBar.style.backgroundColor = "#151515";
    // navBar.style.transitionDelay = "2s";
  } else {
    navBar.classList.remove("fixed-nav");
    navBar.style.position = "absolute";
    navBar.style.top = 0;
    navBar.style.backgroundColor = "transparent";
  }
}

window.addEventListener("scroll", initParallax);

// changing text code

(function(){
  var words = [
    'Brazilian Jiu Jitsu',
    'Judo',
    'Submission Wrestling',
    'Private Lessons',
    ], i = 0;
  setInterval(function(){
    $('#changingword').fadeOut(function(){
        $(this).html(words[i=(i+1)%words.length]).fadeIn();
    });
  }, 3000);
})();
