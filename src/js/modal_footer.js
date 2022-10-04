(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-team-open]'),
    closeModalBtn: document.querySelector('[data-modal-team-close]'),
    modal: document.querySelector('[data-modal-team'),
    body: document.querySelector('body'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.body.classList.toggle('overflowHidden');
    document.body.classList.toggle('modal-open-team');
    refs.modal.classList.toggle('d-none-team');
  }
})();
