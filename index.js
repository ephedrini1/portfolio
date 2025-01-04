import i18Obj from "./assets/js/translate.js";

window.addEventListener("scroll", hideHeader);

window.onresize = (event) => document.location.reload(true);

function hideHeader() {
  const header = document.querySelector(".header");
  window.onscroll = () => {
    if (
      window.pageYOffset > 30 &&
      !window.matchMedia("(max-width: 768px)").matches
    ) {
      header.classList.add("header_hide");
    } else {
      header.classList.remove("header_hide");
    }
  };
}

window.onload = function () {
  if (window.matchMedia("(max-width: 768px)").matches) {
    document
      .querySelector(".player")
      .setAttribute("poster", "assets/img/video-player.jpg");
  }
};

//language-mode
let lang = "en";

const langBtns = document.querySelectorAll(".lang");

langBtns.forEach((btn) => btn.addEventListener("click", switchLang));

function switchLang(event) {
  lang = event.target.textContent;
  getTranslate(lang);
}

function getTranslate(lang) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const attr = element.getAttribute("data-i18n");
    const value = i18Obj[lang][attr];

    if (attr.includes("placeholder")) {
      element.setAttribute("placeholder", value);
    } else {
      element.textContent = value;
    }
  });
  langBtns.forEach((btn) => {
    if (btn.textContent === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (window.matchMedia("(max-width: 768px)").matches) {
    if (lang === "ru") {
      document.querySelector(".hero_text").classList.add("small_margin");
    } else {
      document.querySelector(".hero_text").classList.remove("small_margin");
    }
  }
}

// theme-mode
let theme = "light";
const themeSwitcher = document.querySelector(".theme");
themeSwitcher.addEventListener("click", switchTheme);

function switchTheme() {
  themeSwitcher.classList.toggle("light_theme");
  theme = themeSwitcher.classList.contains("light_theme") ? "light" : "dark";
  toggleLight();
}

function toggleLight() {
  const lightThemeElements = [
    ".skills",
    ".portfolio",
    ".video",
    ".price",
    ".header_burger",
  ];
  const lightThemeCollect = [".section_title", ".dark_btn"];
  const line = document.querySelectorAll("h2");
  lightThemeElements.forEach((element) =>
    document.querySelector(element).classList.toggle("light_theme")
  );
  lightThemeCollect.forEach((element) =>
    document
      .querySelectorAll(element)
      .forEach((el) => el.classList.toggle("light_theme"))
  );
  line.forEach((element) => {
    if (
      themeSwitcher.classList.contains("light_theme") &&
      element.classList.contains("underline_title")
    ) {
      element.classList.remove("underline_title");
      element.classList.add("line");
    } else if (
      !themeSwitcher.classList.contains("light_theme") &&
      element.classList.contains("line")
    ) {
      element.classList.add("underline_title");
      element.classList.remove("line");
    }
  });
  if (window.matchMedia("(max-width: 768px)").matches) {
    document.querySelector(".navigation_list").classList.toggle("light_theme");
  }
}

//localStorage

function setLocalStorage() {
  localStorage.setItem("lang", lang);
  localStorage.setItem("theme", theme);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  lang = localStorage.getItem("lang");
  getTranslate(lang);

  theme = localStorage.getItem("theme");
  const isLight = themeSwitcher.classList.contains("light_theme");
  if ((theme === "dark" && !isLight) || (theme === "light" && isLight)) {
    return;
  }
  switchTheme();
}
window.addEventListener("load", getLocalStorage);
