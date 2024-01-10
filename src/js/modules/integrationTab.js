export function init() {
  const spans = Array.from(document.querySelectorAll(".js-circle span"));

  const tabs = Array.from(document.querySelectorAll(".js-integration-tab"));

  const close = Array.from(document.querySelectorAll(".js-close"));

  close.map((el) => {
    el.addEventListener("click", () => {
      el.parentNode.classList.remove("integration__tab--current");
      document
        .querySelector(".js-default")
        .classList.add("integration__tab--current");
    });
  });

  tabs.map((el) => {
    Array.from(el.querySelectorAll(".integration__testimonial")).map(
      (el, index) => {
        el.style.transform = `translateX(${50 + index * 50}px)`;
      }
    );
  });

  spans.map((el) => {
    el.addEventListener("click", (current) => triggerTab(current));
  });

  function triggerTab(current) {
    const target = current.target.parentNode;
    const tabId = target.dataset.integrationId;

    const tabToOpen = document.querySelector(
      `[data-integration-tab='${tabId}']`
    );

    tabs
      .filter((el) => el != tabToOpen)
      .map((el) => {
        Array.from(el.querySelectorAll(".integration__testimonial")).map(
          (el, index) => {
            el.style.transform = `translateX(${100 * (index + 1)}px)`;
          }
        );
        el.classList.remove("integration__tab--current");
      });

    Array.from(tabToOpen.querySelectorAll(".integration__testimonial")).map(
      (el, index) => {
        el.style.transitionDelay = `.4s`;
        el.style.transform = `translateX(${0}px)`;
      }
    );

    tabToOpen.classList.add("integration__tab--current");
  }
}
