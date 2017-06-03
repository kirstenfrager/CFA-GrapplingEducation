
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

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { 10px; border-right: 0.08em solid transparent }";
  document.body.appendChild(css);
};

$(function(){
  var onClass = "on";
  var showClass = "show";

  $("input").bind("checkval",function(){
    var label = $(this).prev("label");
    if(this.value !== ""){
      label.addClass(showClass);
    } else {
      label.removeClass(showClass);
    }
  }).on("keyup",function(){
    $(this).trigger("checkval");
  }).on("focus",function(){
    $(this).prev("label").addClass(onClass);
  }).on("blur",function(){
      $(this).prev("label").removeClass(onClass);
  }).trigger("checkval");
});
