export function init() {
  const items = document.querySelectorAll(".js-circle");
  const circles = document.querySelectorAll(".integration__item");

  // Ищем относительный размер кружка
  // Data-amount - это кол-во предполагаемых преимуществ
  // 22 - это минимально допустимый размер круга
  // 4 - магическое число с потолка
  // multiplier - размер кружка из data атрибута amount
  Array.from(items).map((el) => {
    const multiplier = el.dataset.amount;

    el.style.flex = `0 0 ${22 + multiplier * 4}px`;
    el.style.height = `${22 + multiplier * 4}px`;
  });

  // 1. Динамически располагаем текст относительно положения кружка
  // 2. Динамически распологаем кружки по контуру окружности
  // diameter - размер родителя кружка, в этом случае li
  // amount - кол-во кружков
  // angle - градус поворота 1-го элемента
  //

  Array.from(circles).map((el, index) => {
    const diameter = 360;
    const amount = circles.length;
    const angle = diameter / amount;

    // circleParent - это блок, в котором располагаются текст и круг
    // circle - отдельный круг внутри circleParent
    const circleParent = el.querySelector(".js-count");
    const circle = el.querySelector(".js-circle");

    const circleWidth = circle.offsetWidth;
    const circleHeight = circle.offsetHeight;
    // index + 1 рассчитывает градус каждого последующего элемента
    const circleAngle = angle * (index + 1);

    // Текст около кружка
    const text = el.querySelector(".integration__type");

    getTypePosition();

    el.style.transform = `rotate(${circleAngle}deg)`;

    // негативный rotate на блоке с контентом нужен, потому что при развороте
    // родителя, потомки так же разворачиваются
    circleParent.style.transform = `rotate(-${circleAngle}deg)`;

    // Устанавливаем позиционирование текста относительно градуса
    function getTypePosition() {
      if (circleAngle > 90 && circleAngle < 180) {
        text.style.top = 0;
        text.style.left = `${circleWidth}px`;
      } else if (circleAngle >= 180 && circleAngle < 270) {
        text.style.top = `${circleHeight + 10}px`;
        text.style.left = `-${circleWidth / 2}px`;
      } else if (circleAngle >= 270) {
        text.style.right = `${circleWidth}px`;
        text.style.bottom = 0;
        text.style.textAlign = "right";
      } else {
        text.style.bottom = `${circleHeight + 10}px`;
        text.style.left = `-${circleWidth / 2}px`;
      }
    }
  });
}
