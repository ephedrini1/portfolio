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

//portfolio section mode

const portfolioBtns = document.querySelector(".portfolio_btns");
const portfolioImages = document.querySelectorAll(".portfolio_pic");

portfolioBtns.addEventListener("click", updatePortfolioSection);

function updatePortfolioSection(event) {
  if (event.target.classList.contains("portfolio_btn")) {
    const activeBtn = document.querySelector(".btn_active");
    const pressedBtn = event.target;
    activeBtn.classList.remove("btn_active");
    pressedBtn.classList.add("btn_active");
    let season = event.target.dataset.season;
    portfolioImages.forEach(
      (img, index) =>
        (img.src = `./assets/img/portfolio/${season}/${index + 1}.jpg`)
    );
  }
}

function preloadImages() {
  const seasons = ["winter", "spring", "summer", "autumn"];
  seasons.forEach((elem) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/portfolio/${elem}/${i}.jpg`;
    }
  });
}

preloadImages();

//burger menu mode

const burger = document.querySelector(".header_burger");
const menu = document.querySelector(".navigation_list");
const burgerSpan = document.querySelector(".burger");
const navigationLink = document.querySelectorAll(".navigation_link");

burger.addEventListener("click", toggleBurger);

function toggleBurger() {
  menu.classList.toggle("menu_active");
  burger.classList.toggle("active");
  burgerSpan.classList.toggle("active");
  overlay.classList.toggle("active");
}

for (let i = 0; i < navigationLink.length; i++) {
  navigationLink[i].addEventListener("click", function (event) {
    if (
      window.matchMedia("(max-width: 768px)").matches &&
      menu.classList.contains("menu_active")
    ) {
      menu.classList.toggle("menu_active");
      burger.classList.toggle("active");
      burgerSpan.classList.toggle("active");
      overlay.classList.toggle("active");
      document.location =
        this.document.location + navigationLink[i].getAttribute("href");
      event.preventDefault();
    }
  });
}

//ripple

const btn = document.querySelectorAll(".btn");
btn.forEach((elem) => elem.addEventListener("click", addElement));

function addElement(e) {
  const addDiv = document.createElement("div");
  let mValue = Math.max(this.clientWidth, this.clientHeight);
  const sDiv = addDiv.style;
  let rect = this.getBoundingClientRect();
  let px = "px";

  sDiv.height = sDiv.width = mValue + px;
  sDiv.left = e.clientX - rect.left - mValue / 2 + px;
  sDiv.top = e.clientY - rect.top - mValue / 2 + px;

  addDiv.classList.add("pulse");
  this.appendChild(addDiv);
}

console.log(
  "Score: 110 / 110",
  "\n",
  "- [x] вёрстка валидная (10)",
  "\n",
  "- [x] вёрстка семантическая (20)",
  "\n",
  "- [x] вёрстка соответствует макету (48)",
  "\n",
  "- [x] учтены требования к css (12)",
  "\n",
  "- [x] присутствует интерактивность, реализуемая через css (20)",
  "\n"
);
