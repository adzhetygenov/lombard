export function init() {
  const text = Array.from(document.querySelectorAll(".js-readMore"));

  const readMoreBtn =
    '<span class="text--primary-100 text--fs-300 js-readMoreBtn" style="cursor: pointer">Читать полностью</span>';

  text.map((el) => {
    const maxHeight = el.scrollHeight;

    if (maxHeight < 100) return;

    el.insertAdjacentHTML("afterend", readMoreBtn);

    const btn = el.nextElementSibling;

    btn.addEventListener("click", (current) => expandText(current));

    function expandText(current) {
      current = current.target;
      const text = current.previousSibling;

      if (text.style.maxHeight) {
        text.style.maxHeight = null;
        current.innerText = "Читать полностью...";
      } else {
        text.style.maxHeight = `${maxHeight}px`;
        current.innerText = "Скрыть";
      }
    }
  });
}
