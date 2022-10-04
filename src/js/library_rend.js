import moviesMurkup from '../templates/movi-card-library.hbs';
import { pagination } from './pagination';

const watched = document.querySelector('.watched');
const queued = document.querySelector('.queued');
const gallery = document.querySelector('.gallery');
const sliderWrapper = document.querySelector('.slider-wrapper');
const watchedBtn = document.querySelector('#btn_watched');
const queueBtn = document.querySelector('#btn_queue');
const homeBtn = document.querySelector('#activ-homeJs');
const libraryBtn = document.querySelector('#activ-libraryJs');

const localStorageWatched = () =>
  JSON.parse(localStorage.getItem('watched-films-list'));
const localStorageQueue = () =>
  JSON.parse(localStorage.getItem('queued-films-list'));
const isWatchList = () => document.querySelector('.watched') !== null;

watchedBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  pagination.reset(localStorageWatched().length);
  createLibraryCard(
    paginateLocalStorage(
      localStorageWatched(),
      pagination._options.itemsPerPage,
      1
    )
  );
  queueBtn.classList.remove('btn_library_active');
  watchedBtn.classList.add('btn_library_active');
});

queueBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  pagination.reset(localStorageQueue().length);
  createLibraryCard(
    paginateLocalStorage(
      localStorageQueue(),
      pagination._options.itemsPerPage,
      1
    )
  );
  watchedBtn.classList.remove('btn_library_active');
  queueBtn.classList.add('btn_library_active');
});
homeBtn.addEventListener('click', () => {
  location.reload();
});

libraryBtn.addEventListener('click', () => {
  watchedBtn.classList.add('btn_library_active');
  queueBtn.classList.remove('btn_library_active');
  gallery.innerHTML = null;
  sliderWrapper.innerHTML = null;
  pagination.reset(localStorageWatched().length);
  createLibraryCard(
    paginateLocalStorage(
      localStorageWatched(),
      pagination._options.itemsPerPage,
      1
    )
  );
});

function createLibraryCard(movies) {
  const markup = movies
    .map(watched_queue => moviesMurkup(watched_queue))
    .join('');
  if (isWatchList()) {
    watched.innerHTML = markup;
    queued.innerHTML = null;
  } else {
    watched.innerHTML = null;
    queued.innerHTML = markup;
  }
  gallery.innerHTML = null;
  pagination._offByEventName('afterMove', 'getResponseMovie');
  pagination.on('afterMove', getNextPage);
}

const paginateLocalStorage = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

function getNextPage(event) {
  try {
    let currentStorage;
    if (isWatchList()) {
      currentStorage = localStorageWatched();
    } else {
      currentStorage = localStorageQueue();
    }
    const movies = paginateLocalStorage(
      currentStorage,
      pagination._options.itemsPerPage,
      pagination.getCurrentPage()
    );
    if (currentStorage.length !== pagination._options.totalItems) {
      console.log('getNextPage ~ pagination.reset', pagination.reset);
      pagination.reset(currentStorage.length);
    }
    console.log('getNextPage ~ pagination', pagination);
    console.log('getNextPage ~ currentStorage', currentStorage);
    createLibraryCard(movies, isWatchList());
  } catch (error) {
    console.log(error);
    Notify.failure(error.name);
  }
  window.scrollTo(0, 0);
}
