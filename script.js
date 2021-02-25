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
