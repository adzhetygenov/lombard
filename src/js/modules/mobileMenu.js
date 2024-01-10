export function init() {
  const btn = document.querySelector(".js-mobile");
  const nav = document.querySelector(".js-nav");

  btn.addEventListener("click", openMenu);

  function openMenu() {
    const navHeight = nav.offsetHeight;
    const btnHeight = btn.offsetHeight;
    const ratio = navHeight / btnHeight;

    if (nav.classList.contains("nav--open")) {
      btn.style.transform = null;
    } else {
      btn.style.transform = `translateY(${50 * ratio - 150}%)`;
    }
    nav.classList.toggle("nav--open");
    document.body.classList.toggle("mobile-menu--open");
  }
}
