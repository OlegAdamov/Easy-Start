import moviesMurkup from '../templates/movi-card.hbs';
const gallery = document.querySelector('.gallery');
const sliderWrapper = document.querySelector('.slider-wrapper');
const watchedBtn = document.querySelector('#btn_watched');
const queueBtn = document.querySelector('#btn_queue');
const homeBtn = document.querySelector('#ref_home');
const libraryBtn = document.querySelector('#ref_my-library');

const localStorageWatched = JSON.parse(
  localStorage.getItem('watched-films-list')
);
const localStorageQueue = JSON.parse(localStorage.getItem('queued-films-list'));

watchedBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  createLibraryCard(localStorageWatched);
});

queueBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  createLibraryCard(localStorageQueue);
});

homeBtn.addEventListener('click', () => {
  location.reload();
});

libraryBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  createLibraryCard(localStorageWatched);
});

function createLibraryCard(movies) {
  const markup = movies
    .map(watched_queue => moviesMurkup(watched_queue))
    .join('');
  console.log(markup);
  gallery.insertAdjacentHTML('beforeend', markup);
}
