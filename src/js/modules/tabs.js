export function init() {
  const trigger = Array.from(document.querySelectorAll(".js-tab-trigger"));

  const tabs = Array.from(document.querySelectorAll(".js-group"));

  trigger.map((el) => {
    el.addEventListener("click", (current) => triggerTab(current));
  });

  function triggerTab(current) {
    const target = current.target;
    const tabId = target.dataset.tabTrigger;

    const tabsParent = document.querySelector(`[data-tab-id='${tabId}']`);

    const tabsToOpen = Array.from(
      tabsParent.querySelectorAll(".opportunity__tab")
    );

    tabs
      .filter((el) => el != tabsParent)
      .map((el) => {
        el.classList.remove("opportunity__group--current");
      });

    tabsParent.classList.add("opportunity__group--current");

    tabsToOpen.map((el, index) => {
      el.style.transitionDelay = `${index / 1.5}s`;
    });
  }
}
