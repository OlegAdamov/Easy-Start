import { createGalleryMarkup } from "./gallery";
import storageApi from './localStorage/storage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    galleryRef: document.querySelector('.gallery'),
    closeBtn: document.querySelector('[modal-close-btn]'),
    modal: document.querySelector('.modal-main'),
    galleryItem: document.querySelector('.gallery__item')
}
console.log(refs.galleryRef)
console.log(refs.modal)
refs.closeBtn.addEventListener('click', removeBtn)

function removeBtn () {
    refs.modal.classList.add ('is-hidden');
}




// const refs = {
//   linkEl: document.querySelector('.gallery-link'),
//   titleEl: document.querySelector('.gallery__title'),
//   imgEl: document.querySelector('gallery__img'),
//   ,
// };

const addWatched = document.querySelector('.add-to-watch');
const addQueued = document.querySelector('.add-to-queue');
const filmTitle = document.querySelector('.modal-title');
const filmGenre = document.querySelector('#genre');
const filmPoster = document.querySelector('.image');
const filmVote = document.querySelector('#vote');
const WATCHED_KEY = 'watched-films-list';
const QUEUED_KEY = 'queued-films-list';

// function checkInStorage(data, key) {
//   const savedData = storageApi.load(key);
//   for (const el of savedData) {
//     if (JSON.stringify(el) === JSON.stringify(data)) {
//       return true;
//     }
//   }

//   return false;
// }

addWatched.addEventListener('click', () => {
  const tempData = {
    title: filmTitle.textContent,
    poster: filmPoster.getAttribute('src'),
    genre: filmGenre.textContent,
    vote: filmVote.textContent.split(' / ')[0],
  };
  if (!storageApi.load(WATCHED_KEY)) {
    storageApi.save(WATCHED_KEY, [tempData]);
    Notify.info('Added to Watched');
    return;
  }

  const savedData = storageApi.load(WATCHED_KEY);
  for (const el of savedData) {
    if (JSON.stringify(el) === JSON.stringify(tempData)) {
      Notify.info('Film is already in Watched');
      return;
    }
  }
  savedData.push(tempData);
  storageApi.save(WATCHED_KEY, savedData);
  Notify.info('Added to Watched');
});

addQueued.addEventListener('click', () => {
  const tempData = {
    title: filmTitle.textContent,
    poster: filmPoster.getAttribute('src'),
    genre: filmGenre.textContent,
    vote: filmVote.textContent.split(' / ')[0],
  };
  if (!storageApi.load(QUEUED_KEY)) {
    storageApi.save(QUEUED_KEY, [tempData]);
    Notify.info('Added to Queue');
    return;
  }

  const savedData = storageApi.load(QUEUED_KEY);
  for (const el of savedData) {
    if (JSON.stringify(el) === JSON.stringify(tempData)) {
      Notify.info('Film is already in Queue');
      return;
    }
  }
  savedData.push(tempData);
  storageApi.save(QUEUED_KEY, savedData);
  Notify.info('Added to Queue');
});
