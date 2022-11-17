const scrollElements = document.querySelectorAll(".js-scroll");
/*const throttleCount = document.getElementById('throttle-count');
const scrollCount = document.getElementById('scroll-count');*/

var throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}
var timer = 0;
var count = 0;
var scroll = 0;

window.addEventListener("scroll", () => {
  /*scrollCount.innerHTML = scroll++;*/
  throttle(() => {
    handleScrollAnimation();
    /*throttleCount.innerHTML = count++;*/
  }, 250);
});



/********************
 ********************
 *******************/
/*
function myFunction(idElement) {
  //Ne pas oublier de mettre l'élement à faire apparaitre en display:none;
  var x = document.getElementById(idElement);
  if (window.getComputedStyle(x, null).display == 'none') {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}
*/


/************************
*************************
************************/
/**/
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("custom-slider");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

/************************
*************************
img popup modal
************************/
