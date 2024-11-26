'use strict';



// add Event on multiple elment

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



// PRELOADING

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  // Delay the removal of the loader
  setTimeout(() => {
    loadingElement.classList.add("loaded");
    document.body.classList.remove("active");
  }, 1000); // Adjust this value (in milliseconds) to control how long the loader is visible
});



// MOBILE NAV TOGGLE

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

navTogglers.forEach(toggler => {
  toggler.addEventListener("click", toggleNavbar);
});

// Close navbar when clicking outside
overlay.addEventListener("click", toggleNavbar);

// Close navbar when pressing Escape key
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && navbar.classList.contains("active")) {
    toggleNavbar();
  }
});



// HEADER

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);



/**
 * TEXT ANIMATION EFFECT FOR HERO SECTION
 */

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {

  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    // get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove all character from the current letter box
    letterBoxes[i].textContent = "";

    // loop through all letters
    for (let j = 0; j < letters.length; j++) {

      // create a span
      const span = document.createElement("span");

      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // set the "in" class on the span, if current letter box is active
      // otherwise class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // pass current letter into span
      span.textContent = letters[j];

      // add space class on span, when current letter contain space
      if (letters[j] === " ") span.classList.add("space");

      // pass the span on current letter box
      letterBoxes[i].appendChild(span);

      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.05;

    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }

  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

    setLetterEffect();
  }, (totalLetterBoxDelay * 1000) + 3000);

}

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);



/**
 * BACK TO TOP BUTTON
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();



/**
 * CUSTOM CURSOR WITH TRAIL
 */

const cursor = document.querySelector("[data-cursor]");
const trailCount = 10;
const trails = [];

// Create trail elements
for (let i = 0; i < trailCount; i++) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  document.body.appendChild(trail);
  trails.push(trail);
}

// Move cursor and update trail
document.addEventListener("mousemove", function (event) {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;

  // Update trail positions with delay
  trails.forEach((trail, index) => {
    setTimeout(() => {
      trail.style.left = `${event.clientX}px`;
      trail.style.top = `${event.clientY}px`;
      trail.style.opacity = 1 - (index / trailCount);
    }, index * 50);
  });
});

// Hide cursor and trail when it's out of viewport
document.body.addEventListener("mouseout", function () {
  cursor.style.display = 'none';
  trails.forEach(trail => trail.style.display = 'none');
});

document.body.addEventListener("mouseover", function () {
  cursor.style.display = 'block';
  trails.forEach(trail => trail.style.display = 'block');
});

// Add hover effect for clickable elements
document.querySelectorAll('a, button').forEach(elem => {
  elem.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
  });
  elem.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const flipBtns = document.querySelectorAll('.flip-btn');
  
  flipBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.service-card');
      card.classList.toggle('flipped');
    });
  });
});

document.getElementById('sendEmailButton').addEventListener('click', function() {
    var message = document.getElementById('emailMessage').value;
    var subject = encodeURIComponent('Message'); // Encode the subject
    var body = encodeURIComponent(message); // Encode the body
    var mailtoLink = 'mailto:rmusk07@gmail.com?subject=' + subject + '&body=' + body;
    window.location.href = mailtoLink; // Redirect to the mailto link
});

// Function to detect the browser
function detectBrowser() {
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
        document.getElementById('browser-warning').style.display = 'block'; // Show warning if Safari is detected
    }
}

// Call the function on page load
window.onload = detectBrowser;

