import {showThanksModal} from "./showThanksModal.js";
import {postData} from "./postData.js";

export const bindPostData = (form, message) => {
  form.addEventListener('submit', evt => {
    evt.preventDefault();

    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
    form.append(statusMessage);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData('http://localhost:3000/requests', json)
      .then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      })
      .catch(() => {
        showThanksModal(message.error);
      })
      .finally(() => {
        form.reset();
      })
  });
}