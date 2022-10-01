import FilmAPIService from './feach/FilmAPIService';
import moviesMurkup from '../templates/movi-card.hbs';
import remakeGenres from './feach/remake-genres-ids';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const filmAPIService = new FilmAPIService();
import storageApi from './localStorage/storage';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.getElementById('search-form'),
  loader: document.getElementById('preloader'),
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
  console.log('RENDER');
  const genres = await filmAPIService.getGenres();
  storageApi.save('genres', genres);
})();

async function searchMovies(e) {
  e.preventDefault();
  filmAPIService.query = e.target.elements.searchQuery.value.trim();
  if (filmAPIService.query === '') {
    Notify.failure('Please enter a search word!');
    return;
  }
  try {
    const responsePopularMovie = await filmAPIService.getMovieByQuery();
    const movies = await responsePopularMovie.data.results;
    createGalleryMarkupByQuery(remakeGenres(movies, storageApi.load('genres')));
  } catch (error) {
    Notify.failure(error.name);
  }
}

export async function getResponseMovie() {
  try {
    const responsePopularMovie = await filmAPIService.getPopularMovie();
    const movies = await responsePopularMovie.data.results;
    createGalleryCard(remakeGenres(movies, storageApi.load('genres')));
  } catch (error) {
    Notify.failure(error.name);
  }
}

(async () => await getResponseMovie())();

function createGalleryCard(res) {
  const markup = res.map(movie => moviesMurkup(movie)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function createGalleryMarkupByQuery(movies) {
  const markup = createGalleryMarkup(movies);
  refs.gallery.innerHTML = markup;
}
