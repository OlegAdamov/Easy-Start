import storageApi from './localStorage/storage';
import { API_KEY } from './feach/const';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { createGalleryMarkup } from './gallery';

const refs = {
  galleryRef: document.querySelector('.gallery'),

  closeBtn: document.querySelector('.modal_close_btn'),
  backdrop: document.querySelector('.backdrop'),
  modalContainer: document.querySelector('.modal-container'),
  tasksLoader: document.querySelector('.tasks-loader'),
  addWatched: document.querySelector('.add-to-watch'),
  addQueued: document.querySelector('.add-to-queue'),
  WATCHED_KEY: 'watched-films-list',
  QUEUED_KEY: 'queued-films-list',
};

refs.galleryRef.addEventListener('click', onGalleryClick);

let title = null;
let poster_path = null;
let release_date = null;
let genresName = null;
let vote = null;
let votes = null;
let id = null;
let movieData = null;

export function onGalleryClick(e) {
  e.preventDefault();
  const isMovieCard =
    e.target.closest('.gallery__item') || e.target.closest('.slider-card');
  if (!isMovieCard) {
    return;
  }
  openModal(isMovieCard.id);
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
    <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${
      film.title
    } ${film.name}" class="image" />
  </div>
  <div class="modal-rest">
  <h3 class="modal-title">${film.title}</h3>
      <div class="modal-info">
        <div class="modal-table">
          <table>
              <tbody>
              <tr>
              <th class="info-item">Vote / Votes</th>
              <td class="count" id="vote"><span class = "vote_accent">${Number(
                film.vote_average
              ).toFixed(1)}</span> / ${film.vote_count}</td>
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
    votes = film.vote_count;
    poster_path = film.poster_path;
    release_date = film.release_date.split('-')[0];
    movieData = { ...film, genresName, release_date };
  });

  refs.backdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
  closeModal();
}

function closeModal() {
  document.addEventListener('click', e => {
    if (e.target === refs.backdrop) {
      refs.backdrop.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      refs.backdrop.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
    }
  });
  refs.closeBtn.addEventListener('click', () => {
    refs.backdrop.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
  });
}
refs.addWatched.addEventListener('click', () => {
  refs.addWatched.style.backgroundColor = '#ff6b01';
  refs.addWatched.style.color = '#fff';
  // refs.addWatched.textContent = 'remove from watched';
  if (!storageApi.load(refs.WATCHED_KEY)) {
    storageApi.save(refs.WATCHED_KEY, [movieData]);
    Notify.info(`Added to Watched`);
    return;
  }
  const savedData = storageApi.load(refs.WATCHED_KEY);
  for (const el of savedData) {
    if (JSON.stringify(el) === JSON.stringify(movieData)) {
      Notify.info(`Film is already in Watched`);
      return;
    }
  }
  savedData.push(movieData);

  storageApi.save(refs.WATCHED_KEY, savedData);
  Notify.info(`Added to Watched`);
  refs.addWatched.removeEventListener;
});

refs.addQueued.addEventListener('click', () => {
  refs.addQueued.style.backgroundColor = '#ff6b01';
  refs.addQueued.style.color = '#fff';
  if (!storageApi.load(refs.QUEUED_KEY)) {
    storageApi.save(refs.QUEUED_KEY, [movieData]);

    Notify.info(`Added to Queue`);
    return;
  }
  const savedData = storageApi.load(refs.QUEUED_KEY);
  for (const el of savedData) {
    if (JSON.stringify(el) === JSON.stringify(movieData)) {
      Notify.info(`Film is already in Queue`);
      return;
    }
  }
  savedData.push(movieData);

  storageApi.save(refs.QUEUED_KEY, savedData);

  Notify.info(`Added to Queue`);
});

refs.addQueued.addEventListener('click', handlerQueue);
refs.addWatched.addEventListener('click', handlerWatched);

function handlerQueue(e) {
  var el = e.target;
  if (el.innerHTML == 'add to queue') {
    refs.addQueued.style.backgroundColor = '#fff';
    refs.addQueued.style.color = '#000';
  }
}

function handlerWatched(e) {
  var el = e.target;
  if (el.innerHTML == 'add to watched') {
    refs.addWatched.style.backgroundColor = '#fff';
    refs.addWatched.style.color = '#000';
  }
}
