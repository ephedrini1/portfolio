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
