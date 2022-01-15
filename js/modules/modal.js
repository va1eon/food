export const getModal = () => modal({
  triggers: '[data-modal]',
  selector: '.modal',
  showClass: 'show',
  closeTrigger: 'data-close',
  durationOpen: 6000
});

const modal = options => {
  const {triggers, selector, showClass, closeTrigger, durationOpen} = options;
  const modalTriggers = document.querySelectorAll(triggers);
  const modal = document.querySelector(selector);

  const openModal = () => {
    if (!modal.classList.contains(showClass)) {
      modal.classList.add(showClass);
      document.body.style.overflow = 'hidden';
      clearTimeout(modalTimerId);
    }
  }

  const closeModal = () => {
    if (modal.classList.contains(showClass)) {
      modal.classList.remove(showClass);
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  modal.addEventListener('click', evt => {
    if (evt.target === modal || evt.target.getAttribute(closeTrigger) === '') closeModal();
  });
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape' && modal.classList.contains(showClass)) closeModal();
  });
  const modalTimerId = setTimeout(openModal, durationOpen);
  const showModalByScroll = () => {
    if (window.scrollY + document.documentElement.clientHeight
      >=
      document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  return {
    modal,
    openModal,
    closeModal
  }
}