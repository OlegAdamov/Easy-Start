import FilmAPIService from './feach/FilmAPIService';
const galleryRefs = document.querySelector('.gallery');
const filmAPIService = new FilmAPIService();

filmAPIService
  .getPopularMovie()
  .then(res => {
    console.log(res);
    renderGalleryMarkup(res);
  })
  .catch(error => {
    console.log(error);
  });

function createGalleryMarkup(res) {
  return res.data.results
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

function renderGalleryMarkup(res) {
  const markup = createGalleryMarkup(res);
  galleryRefs.insertAdjacentHTML('beforeend', markup);
}
