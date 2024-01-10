import Swiper from "swiper";
import { Navigation } from "swiper/modules";

export function init() {
  const swiper = new Swiper(".js-feedback", {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      // when window width is >= 320px
      576: {
        slidesPerView: 2,
        spaceBetween: 20
      },

      762: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    },

    // Navigation arrows
    navigation: {
      nextEl: ".js-next",
      prevEl: ".js-prev"
    }
  });
}
