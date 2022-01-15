import {getModal} from "../modal.js";

export const showThanksModal = message => {
  const prevModalDialog = document.querySelector('.modal__dialog');
  prevModalDialog.classList.add('hide');
  getModal().openModal();

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close="">&times;</div>
      <div class="modal__title">${message}</div>
    </div>`;

  getModal().modal.append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.remove('hide');
    getModal().closeModal();
  }, 4000);
}

