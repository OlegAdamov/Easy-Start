import storageApi from './localStorage/storage';
import { API_KEY } from './feach/const';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { createGalleryMarkup } from './gallery';

const refs = {
  galleryRef: document.querySelector('.gallery'),
  closeBtn: document.querySelector('.modal-close-btn'),
  backdrop: document.querySelector('.backdrop'),
  modalContainer: document.querySelector('.modal-container'),
  tasksLoader: document.querySelector('.tasks-loader')
};
refs.galleryRef.addEventListener('click', onGalleryClick);

let title = null;
let poster_path = null;
let release_date = null;
let genresName = null;
let vote = null;
let id = null;
let movieData = null;

export function onGalleryClick(e) {
  e.preventDefault();
  const isMovieCard =
    e.target.closest('.gallery__item') || e.target.closest('.slider-card');
  console.log(isMovieCard, 'isMovieCard');
  if (!isMovieCard) {
    return;
  }
  openModal(isMovieCard.id);
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      refs.backdrop.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
    }
    return isMovieCard;
  });
  // checkWatchedAndQueued();
}



async function fetchDesr(movieId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  const descriptionFilm = await response.json();
  return descriptionFilm;
}

function openModal(movie) {
  fetchDesr(movie).then(film => {
    refs.modalContainer.innerHTML = `
    <div class="modal-img">
    <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title} ${film.name}" class="image" />
  </div>
  <div class="modal-rest">
  <h3 class="modal-title">${film.title}</h3>
      <div class="modal-info">
      <div class="modal-table">
        
        <div class="info-element">      
        <p class="info-item">Vote / Votes</p>
        <p class="count" id="vote"><span class="count-votes">${film.vote_average}</span> / ${film.vote_count}</p>
        </div>
        <div class="info-element">
        <p class="info-item">Popularity</p>
        <p class="count">${film.popularity}</p>
        </div>
        <div class="info-element">
        <p class="info-item">Original Title</p>
        <p class="count">${film.original_title}</p>
        </div>
        <div class="info-element">
        <p class="info-item">Genre</p>
        <p class="count">${film.genres
          .map(genre => genre.name)
          .join(', ')}</p>
          </div>
        </div>
        <h3 class="about">About</h3>
        <p class="about-info">${film.overview}</p>
        </div>
        </div>`;
    id = film.id;
    title = film.title;
    vote = film.vote_average;
    poster_path = film.poster_path;
    const genres = [];
    film.genres.forEach(el => {
      genres.push(el.name);
    });
    genresName = genres.join(', ');
    release_date = film.release_date.split('-')[0];
    movieData = { ...film, genresName, release_date };
  });

  refs.backdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

window.addEventListener('click', e => {
  if (e.target === refs.backdrop) {
    refs.backdrop.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
  }
});

refs.closeBtn.addEventListener('click', () => {
  refs.backdrop.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
});

const addWatched = document.querySelector('.add-to-watch');
const addQueued = document.querySelector('.add-to-queue');

const WATCHED_KEY = 'watched-films-list';
const QUEUED_KEY = 'queued-films-list';

addWatched.addEventListener('click', () => {
  if (!storageApi.load(WATCHED_KEY)) {
    storageApi.save(WATCHED_KEY, [movieData]);
    Notify.info(`Added to Watched`);
    return;
  }

  const savedData = storageApi.load(WATCHED_KEY);
  for (const el of savedData) {
    if (JSON.stringify(el) === JSON.stringify(movieData)) {
      Notify.info(`Film is already in Watched`);
      return;
    }
  }
  savedData.push(movieData);
  storageApi.save(WATCHED_KEY, savedData);

  Notify.info(`Added to Watched`);
});

addQueued.addEventListener('click', () => {
  if (!storageApi.load(QUEUED_KEY)) {
    storageApi.save(QUEUED_KEY, [movieData]);
    Notify.info(`Added to Queue`);
    return;
  }

  const savedData = storageApi.load(QUEUED_KEY);
  for (const el of savedData) {
    if (JSON.stringify(el) === JSON.stringify(movieData)) {
      Notify.info(`Film is already in Queue`);
      return;
    }
  }
  savedData.push(movieData);
  storageApi.save(QUEUED_KEY, savedData);
  Notify.info(`Added to Queue`);
});
