import moviesMurkup from '../templates/movi-card.hbs';
import { pagination } from './pagination';

const watched = document.querySelector('.watched');
const queued = document.querySelector('.queued');
const gallery = document.querySelector('.gallery');
const sliderWrapper = document.querySelector('.slider-wrapper');
const watchedBtn = document.querySelector('#btn_watched');
const queueBtn = document.querySelector('#btn_queue');
const homeBtn = document.querySelector('#activ-homeJs');
const libraryBtn = document.querySelector('#activ-libraryJs');
const galleryItem = document.querySelector('gallery__item');

const localStorageWatched = () =>
  JSON.parse(localStorage.getItem('watched-films-list'));
const localStorageQueue = () =>
  JSON.parse(localStorage.getItem('queued-films-list'));
const isWatchList = () => document.querySelector('.watched') !== null;

watchedBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  pagination.reset(localStorageWatched().length);
  createLibraryCard(paginateLocalStorage(localStorageWatched(), pagination._options.itemsPerPage, 1));
  queueBtn.classList.remove('btn_library_active');
  watchedBtn.classList.add('btn_library_active');
});

queueBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  pagination.reset(localStorageQueue().length);
  createLibraryCard(paginateLocalStorage(localStorageQueue(), pagination._options.itemsPerPage, 1));
  watchedBtn.classList.remove('btn_library_active');
  queueBtn.classList.add('btn_library_active');
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
  gallery.insertAdjacentHTML('beforeend', markup);
}
