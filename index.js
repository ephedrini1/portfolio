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
