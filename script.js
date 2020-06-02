// window.setTimeout(function(){}, milliseconds);

var track = document.querySelector(".carousel-track");
var slides = Array.from(track.children);
var nextButton = document.querySelector(".carousel-button-right");
var prevButton = document.querySelector(".carousel-button-left");
var dotsNav = document.querySelector(".carousel-nav");
var dots = Array.from(dotsNav.children);
var slideWidth = slides[0].getBoundingClientRect().width;

//arrange the slides next to one another.
for (var i = 0; i < slides.length; i++) {
    slides[i].style.left = slideWidth * i + "px";
}
//var amountToMove = nextSlide.style.left;
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
};

var timer = setInterval(function() {
    var currentSlide = document.querySelector(".current-slide");
    var targetSlide;
    var currentDot = dotsNav.querySelector(".current-slide");
    var nextDot = currentDot.nextElementSibling;

    if (currentSlide.nextElementSibling == undefined) {
        targetSlide = slides[0];
        updateDots(currentDot, dots[0]);
    } else {
        targetSlide = currentSlide.nextElementSibling;
        updateDots(currentDot, nextDot);
    }

    moveToSlide(track, currentSlide, targetSlide);
}, 3000);

//dots selector
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
};

//when i click left, move slide to left.
nextButton.addEventListener("click", event => {
    var currentSlide = track.querySelector(".current-slide");
    var nextSlide = currentSlide.nextElementSibling;
    var currentDot = dotsNav.querySelector(".current-slide");
    var nextDot = currentDot.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
});

//when i click right, move slide to right.
prevButton.addEventListener("click", event => {
    var currentSlide = track.querySelector(".current-slide");
    var prevSlide = currentSlide.previousElementSibling;
    var currentDot = dotsNav.querySelector(".current-slide");
    var prevDot = currentDot.previousElementSibling;

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
});

//when i click the nav indicator, move to selected slide.
dotsNav.addEventListener("click", event => {
    //what indicator was cliked on
    var targetDot = event.target.closest("button");

    console.log(targetDot);

    var currentSlide = track.querySelector(".current-slide");
    var currentDot = dotsNav.querySelector(".current-slide");
    var targetIndex = dots.findIndex(dot => dot === targetDot);
    var targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});
