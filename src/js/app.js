import * as image from "./modules/webpSupport.js";
import * as testimonials from "./modules/testimonials.js";
import * as tabs from "./modules/tabs.js";
import * as integration from "./modules/integration.js";
import * as integrationTabs from "./modules/integrationTab.js";
import * as feedbackCarousel from "./modules/feedbackCarousel.js";
import * as feedbackReadMore from "./modules/feedbackReadMore.js";
import * as updateCarousel from "./modules/updateCarousel.js";
import * as form from "./modules/form.js";
import * as phoneMask from "./modules/phoneMask.js";
import * as mobileMenu from "./modules/mobileMenu.js";

image.isWebp();

testimonials.init();
tabs.init();
integration.init();
integrationTabs.init();
feedbackCarousel.init();
feedbackReadMore.init();
updateCarousel.init();
form.init();
phoneMask.init();
mobileMenu.init();
