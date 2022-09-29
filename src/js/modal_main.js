import { createGalleryMarkup } from "./gallery";

const refs = {
    galleryRef: document.querySelector('.gallery'),
    closeBtn: document.querySelector('[modal-close-btn]'),
    modal: document.querySelector('.modal-main'),
    galleryItem: document.querySelector('.gallery__item')
}
console.log(refs.galleryRef)
console.log(refs.modal)
refs.closeBtn.addEventListener('click',removeBtn)

function removeBtn () {
    refs.modal.classList.add ('is-hidden');
}