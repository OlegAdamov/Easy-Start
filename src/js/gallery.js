import FilmAPIService from './feach/FilmAPIService';
import moviesMurkup from '../templates/movi-card.hbs';
import remakeGenres from './feach/remake-genres-ids';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import storageApi from './localStorage/storage';
import { pagination } from './pagination';

const filmAPIService = new FilmAPIService();
const refs = {
  gallery: document.querySelector('.gallery'),
  watched: document.querySelector('.watched'),
  queued: document.querySelector('.queued'),
  searchForm: document.getElementById('search-form'),
  loader: document.getElementById('preloader'),
  throwError: document.querySelector('.error-output'),
};
window.addEventListener('load', onLoader);
function onLoader() {
  setTimeout(() => {
    refs.loader.style.display = 'none';
  }, 500);
}
refs.searchForm.addEventListener('submit', searchMovies);

// TODO: await response before rendering the page
(async () => {
  const genres = await filmAPIService.getGenres();
  storageApi.save('genres', genres);
})();

async function searchMovies(e) {
  e.preventDefault();
  filmAPIService.query = e.target.elements.searchQuery.value.trim();
  if (filmAPIService.query === '') {
    throwError();
    window.setTimeout(removeError, 2500);
    return;
  }
  try {
    const responsePopularMovie = await filmAPIService.getMovieByQuery();
    const movies = await responsePopularMovie.data.results;
    if (movies.length === 0) {
      throwError();
      window.setTimeout(removeError, 2500);
      return;
    }
    createGalleryMarkupByQuery(remakeGenres(movies, storageApi.load('genres')));
  } catch (error) {
    console.log(error.name);
    refs.throwError.textContent = `${error.name}`;
  }
}

export async function getResponseMovie(event) {
  console.log();
  try {
    filmAPIService.page = event?.page || 1;
    const responsePopularMovie = await filmAPIService.getPopularMovie();
    const movies = await responsePopularMovie.data.results;

     if (
      responsePopularMovie.data.total_results !== pagination._options.totalItems
    ) {
      pagination.reset(responsePopularMovie.data.total_results);
    }
    createGalleryMarkup(remakeGenres(movies, storageApi.load('genres')));

  } catch (error) {
    console.log(error);
    Notify.failure(error.name);
  }
}

(async () => await getResponseMovie())();

function createGalleryMarkup(res) {
  const markup = res.map(movie => moviesMurkup(movie)).join('');
  refs.queued.innerHTML = null;
  refs.watched.innerHTML = null;
  refs.gallery.innerHTML = markup;
  pagination._offByEventName('afterMove', 'getNextPage');
  pagination.on('afterMove', getResponseMovie);
}


function createGalleryMarkupByQuery(res) {
  const markup = res.map(movie => moviesMurkup(movie)).join('');
    refs.queued.innerHTML = null;
  refs.watched.innerHTML = null;

  refs.gallery.innerHTML = markup;
  pagination._offByEventName('afterMove', 'getNextPage');
  pagination.on('afterMove', getResponseMovie);
}
function throwError() {
  refs.throwError.textContent =
    'Search result not successful. Enter the correct movie name and';
}
function removeError() {
  refs.throwError.textContent = '';
}
