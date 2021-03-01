// "use strict";

// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Responsive Navbar Start
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

// Smooth Transition Start
const btnScroll = document.querySelector(".btn--scroll-to");
const btnScrollEnd = document.querySelector("#section--1");

//Operation Content
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
// Nav
const navBar = document.querySelector(".nav");
// Header
const header = document.querySelector(".header");

// Modal window

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((button) => button.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// |-------------------------------------------------------------------------- |

// Responsive Navbar Start

hamburger.addEventListener("click", () => {
  //Animate Links
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  //Hamburger Animation
  hamburger.classList.toggle("toggle");
});
// Responive Navbar Finished

// |---------------------------------------------------------------------------|

// Smooth Transition Start

btnScroll.addEventListener("click", (e) => {
  btnScrollEnd.scrollIntoView({ behavior: "smooth" });
});

// |---------------------------------------------------------------------------|
// add event listener

const events = document.querySelector("h1");
const func = () => {
  events.removeEventListener("mouseover", func);
};

events.addEventListener("mouseover", func);

// |---------------------------------------------------------------------------|

// scroll

document.querySelector(".nav-links").addEventListener("click", (e) => {
  e.preventDefault();
  //
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const logoScroll = document.querySelector(".logo-scroll");
const end = document.querySelector("#header__title");
logoScroll.addEventListener("click", (e) => {
  end.scrollIntoView({ behavior: "smooth" });
});
// |----------------------------------------------------------------------------|

tabsContainer.addEventListener("click", function (e) {
  const btnClicked = e.target.closest(".operations__tab");

  // Guard Clause
  if (!btnClicked) return console.log("Not clicked in correct element");

  // remove class active
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));

  btnClicked.classList.add("operations__tab--active");

  // Content add and hide

  tabsContent.forEach((tc) =>
    tc.classList.remove("operations__content--active")
  );

  document
    .querySelector(`.operations__content--${btnClicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// |---------------------------------------------------------------------------|

// The Observer Intersection API

//  NavBar
const obsCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) navBar.classList.add("sticky");
  else navBar.classList.remove("sticky");
};

const obsObj = {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
};

const observer = new IntersectionObserver(obsCallback, obsObj);

observer.observe(header);

// |---------------------------------------------------------------------------|

// content loading when we scroll

const sectionAll = document.querySelectorAll(".section");

const loadFunc = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const loadOps = {
  root: null,
  threshold: 0.2,
};

const obsLoad = new IntersectionObserver(loadFunc, loadOps);
sectionAll.forEach((section) => {
  section.classList.add("section--hidden");
  obsLoad.observe(section);
});

// |---------------------------------------------------------------------------|

// // Slider

const slide = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");

let curSlide = 1;
let maxSlide = slide.length - 1;

const goToSlide = (paraSlide) => {
  slide.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - paraSlide)}%)`)
  );
};
const activeDot = function (paraSlide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${paraSlide}"]`)
    .classList.add("dots__dot--active");
};
const nextSlide = () => {
  if (curSlide < maxSlide) {
    curSlide++;
  } else curSlide = 0;
  goToSlide(curSlide);
  activeDot(curSlide);
};
const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else curSlide--;
  goToSlide(curSlide);
  activeDot(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// KeySlide
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  e.key === "ArrowLeft" && prevSlide();
});

// Dots
const dots = document.querySelector(".dots");

const createDots = function () {
  slide.forEach((_, i) => {
    dots.insertAdjacentHTML(
      "beforeend",
      `    <button class="dots__dot" data-slide='${i}'></button>
    `
    );
  });
};

dots.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
  }
});

// Init
const init = () => {
  createDots();
  activeDot(1);
  goToSlide(1);
};
init();

// |---------------------------------------------------------------------------|
