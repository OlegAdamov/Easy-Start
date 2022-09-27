import FilmAPIService from './feach/FilmAPIService';
const filmAPIService = new FilmAPIService();

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.getElementById('search-form'),
};

refs.searchForm.addEventListener('submit', searchMovies);

async function searchMovies(e) {
  e.preventDefault();
  filmAPIService.query = e.target.elements.searchQuery.value.trim();
  if (filmAPIService.query === '') {
    Notify.failure('Please enter a search word!');
    return;
  }
  const responsePopularMovie = await filmAPIService.getMovieByQuery();
  const movies = await responsePopularMovie.data.results;
  renderGalleryMarkupByQuery(movies);
}

async function getResponseMovie() {
  const responsePopularMovie = await filmAPIService.getPopularMovie();
  const responseGenres = await filmAPIService.getGenres();
  const movies = await responsePopularMovie.data.results;
  const genres = await responseGenres.data.genres;
  const genre = genres.map(genre => filmAPIService.genres.push(genre));
  renderGalleryMarkup(movies);
}
getResponseMovie();

function renderGalleryMarkup(res) {
  const markup = createGalleryMarkup(res);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function renderGalleryMarkupByQuery(movies) {
  const markup = createGalleryMarkup(movies);
  refs.gallery.innerHTML = markup;
}
function createGalleryMarkup(res) {
  return res
    .map(
      ({
        id,
        poster_path,
        title,
        release_date,
      }) => ` <li id ="${id}" class="gallery__item">
        <a href="/" class="gallery__link">
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" class="gallery__img">

           <h2 class="gallery__title">${title}</h2>
            <div class ="discription"><p class="gallery__discription">${release_date}</p>
            </div>
        </a>
    </li>`
    )
    .join(' ');
}
