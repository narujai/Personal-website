"use strict";

document.querySelector("#year").textContent = new Date().getFullYear();

const themeToggle = document.querySelector("[data-theme-toggle]");
const savedTheme = localStorage.getItem("theme");
const initialTheme = savedTheme || "dark";

const applyTheme = (theme) => {
  const isLight = theme === "light";
  document.body.classList.toggle("light-theme", isLight);

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  }
};

applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const activatePage = (targetPage, shouldScroll = true) => {
  const pageExists = Array.from(pages).some((page) => page.dataset.page === targetPage);
  const nextPage = pageExists ? targetPage : "about";

  for (const page of pages) {
    page.classList.toggle("active", page.dataset.page === nextPage);
  }

  for (const link of navigationLinks) {
    link.classList.toggle("active", link.textContent.trim().toLowerCase() === nextPage);
  }

  if (window.location.hash !== `#${nextPage}`) {
    history.replaceState(null, "", `#${nextPage}`);
  }

  if (shouldScroll) {
    window.scrollTo(0, 0);
  }
};

const initialPage = window.location.hash.replace("#", "") || "about";
activatePage(initialPage, false);

for (const navLink of navigationLinks) {
  navLink.addEventListener("click", function () {
    const targetPage = this.textContent.trim().toLowerCase();
    activatePage(targetPage);
  });
}

window.addEventListener("hashchange", () => {
  const targetPage = window.location.hash.replace("#", "") || "about";
  activatePage(targetPage);
});
