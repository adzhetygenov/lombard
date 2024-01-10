import IMask from "imask";

export function init() {
  const maskOptions = {
    mask: "+{7}(000) 000-00-00"
  };

  const mask = IMask(phone, maskOptions);
}
