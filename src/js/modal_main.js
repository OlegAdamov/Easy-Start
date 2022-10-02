import { createGalleryMarkup } from './gallery';
import storageApi from './localStorage/storage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = 'ba12bbb2efd4020faab2c5dd14dc19c0';
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

export function onGalleryClick(e) {
  e.preventDefault();
  const isMovieCard =
    e.target.closest('.gallery__item') || e.target.closest('.slider-card');
  console.log(isMovieCard, 'isMovieCard');
  if (!isMovieCard) {
    return;
  }
  openModal(isMovieCard.id);
  refs.galleryRef.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      refs.backdrop.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
    }
    return isMovieCard;
  });
  
  // checkWatchedAndQueued();
}

// function checkWatchedAndQueued() {
//   const tempData = {
//     title,
//     poster_path,
//     release_date,
//     genresName,
//     vote,
//     id,
//   };
// console.log(JSON.stringify(tempData));
// console.log(tempData);
// const savedDataWatched = storageApi.load(WATCHED_KEY);
// const savedDataQueued = storageApi.load(QUEUED_KEY);

// console.log(localStorage.getItem('queued-films-list'));
// console.log(JSON.stringify(tempData));

// for (const el of savedDataWatched) {
//   if (JSON.stringify(el) === localStorage.getItem('watched-films-list')) {
//     addWatched.textContent = 'remove from watched';
//   }
// }
// for (const el of savedDataQueued) {
//   if (JSON.stringify(el) === localStorage.getItem('queued-films-list')) {
//     addQueued.textContent = 'remove from queued';
//   }
// }
// }

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
      <table>
        <tbody>
        <tr>
        <th class="info-item">Vote / Votes</th>
        <td class="count" id="vote">${film.vote_average}</td>
        </tr>    
        <tr>
        <th class="info-item">Popularity</th>
        <td class="count">${film.popularity}</td>
        </tr>    
        <tr>
        <th class="info-item">Original Title</th>
        <td class="count">${film.original_title}</td>
        </tr>   
        <tr>
        <th class="info-item">Genre</th>
        <td class="count">${film.genres
          .map(genre => genre.name)
          .join(', ')}</td>
        </tr>
        </tbody>
        </table>
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
// const filmTitle = document.querySelector('.modal-title');
// const filmGenre = document.querySelector('#genre');
// const filmPoster = document.querySelector('.image');
// const filmVote = document.querySelector('#vote');
const WATCHED_KEY = 'watched-films-list';
const QUEUED_KEY = 'queued-films-list';

addWatched.addEventListener('click', () => {
  const tempData = {
    title,
    poster_path,
    release_date,
    genresName,
    vote,
    id,
  };
  if (!storageApi.load(WATCHED_KEY)) {
    storageApi.save(WATCHED_KEY, [tempData]);
    Notify.info('Added to Watched');
    return;
  }

  const savedData = storageApi.load(WATCHED_KEY);
  for (const el of savedData) {
    if (JSON.stringify(el) === JSON.stringify(tempData)) {
      Notify.info('Film is already in Watched');
      return;
    }
  }
  savedData.push(tempData);
  storageApi.save(WATCHED_KEY, savedData);

  Notify.info('Added to Watched');
});

addQueued.addEventListener('click', () => {
  const tempData = {
    title,
    poster_path,
    release_date,
    genresName,
    vote,
    id,
  };
  if (!storageApi.load(QUEUED_KEY)) {
    storageApi.save(QUEUED_KEY, [tempData]);
    Notify.info('Added to Queue');
    return;
  }

  const savedData = storageApi.load(QUEUED_KEY);
  for (const el of savedData) {
    if (JSON.stringify(el) === JSON.stringify(tempData)) {
      Notify.info('Film is already in Queue');
      return;
    }
  }
  savedData.push(tempData);
  storageApi.save(QUEUED_KEY, savedData);
  Notify.info('Added to Queue');
});
