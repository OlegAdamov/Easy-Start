import moviesMurkup from '../templates/movi-card.hbs';

const watched = document.querySelector('.watched');
const queued = document.querySelector('.queued');
const gallery = document.querySelector('.gallery');
const sliderWrapper = document.querySelector('.slider-wrapper');
const watchedBtn = document.querySelector('#btn_watched');
const queueBtn = document.querySelector('#btn_queue');
const homeBtn = document.querySelector('#activ-homeJs');
const libraryBtn = document.querySelector('#activ-libraryJs');

const localStorageWatched = () => JSON.parse(localStorage.getItem('watched-films-list'));
const localStorageQueue = () => JSON.parse(localStorage.getItem('queued-films-list'))
;

watchedBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  createLibraryCard(localStorageWatched(), true);
});

queueBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  createLibraryCard(localStorageQueue(), false);
});

homeBtn.addEventListener('click', () => {
  location.reload();
});

libraryBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  createLibraryCard(localStorageWatched());
});

function createLibraryCard(movies, isWatchList) {
  console.log(movies)
  const markup = movies
    .map(watched_queue => moviesMurkup(watched_queue))
    .join('');
  console.log(markup);
  if (isWatchList) {
    watched.innerHTML = markup;
    queued.innerHTML = null;
  } else {
    watched.innerHTML = null;
    queued.innerHTML = markup;
  }
  gallery.innerHTML = null;
}

