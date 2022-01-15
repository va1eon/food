import {bindPostData} from "./services/bindPostData.js";

export const request = (options) => {
  const {selector, message} = options
  const forms = document.querySelectorAll(selector);
  forms.forEach(item => {
    bindPostData(item, message);
  });
}