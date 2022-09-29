import storageApi from './localStorage/storage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const refs = {
//   linkEl: document.querySelector('.gallery-link'),
//   titleEl: document.querySelector('.gallery__title'),
//   imgEl: document.querySelector('gallery__img'),
//   galleryRef: document.querySelector('.gallery'),
// };

const addWatched = document.querySelector('.add-to-watch');
const addQueued = document.querySelector('.add-to-queue');
const filmTitle = document.querySelector('.modal-title');
const filmGenre = document.querySelector('#genre');
const filmPoster = document.querySelector('.image');
const filmVote = document.querySelector('#vote');
const WATCHED_KEY = 'watched-films-list';
const QUEUED_KEY = 'queued-films-list';

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
