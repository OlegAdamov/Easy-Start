import FilmAPIService from './feach/FilmAPIService';
const filmAPIService = new FilmAPIService();

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.getElementById('search-form'),
};
async function getResponseMovie() {
  const response = await filmAPIService.getPopularMovie();
  const movies = await response.data.results;
  console.log('getResponseMovie ~ v', movies);
  const moviArray = movies.map(({ ids }) => ids);
  filmAPIService.moviId = moviArray.map(id => id);
  console.log(filmAPIService.moviId);
  renderGalleryMarkup(movies);

  // .then(res => {
  //   console.log(res);
  //   renderGalleryMarkup(res);
  // })
  // .catch(error => {
  //   console.log(error);
  // });
}
getResponseMovie();

function renderGalleryMarkup(res) {
  const markup = createGalleryMarkup(res);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
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
