export function init() {
  const form = document.querySelector(".js-form");
  const input = Array.from(form.querySelectorAll(".js-input"));

  input.map((el) => {
    el.addEventListener("focusout", (e) => {
      if (!e.target.value) {
        e.target.classList.remove("callback__input--active");
      } else {
        e.target.classList.add("callback__input--active");
      }
    });

    el.addEventListener("focus", removePrompt);
  });

  function removePrompt() {
    Array.from(form.querySelectorAll(".js-invalid")).map((el) => el.remove());
  }

  const errMsg = (msg) => {
    const errBlock = document.createElement("div");
    errBlock.classList.add("js-invalid", "text--fs-300", "text--primary-100");
    errBlock.innerText = msg;

    return errBlock;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    removePrompt();

    const name = form.querySelector(".js-name");
    const mail = form.querySelector(".js-mail");
    const phone = form.querySelector(".js-phone");

    input.map((el) => {
      let msg;
      switch (el) {
        case name:
          msg = "Введите имя";
          break;
        case mail:
          msg = "Введите адрес почты";
          break;
        case phone:
          msg = "Введите телефон";
          break;
        default:
          msg = "Задайте вопрос";
          break;
      }

      el.parentNode.insertAdjacentElement("beforebegin", errMsg(msg));
    });
  });
}
