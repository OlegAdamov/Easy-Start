import storageApi from './localStorage/storage';
import { API_KEY } from './feach/const';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { createGalleryMarkup } from './gallery';

const refs = {
  galleryRef: document.querySelector('.gallery'),
  watched: document.querySelector('.watched'),
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
refs.watched.addEventListener('click', onGalleryClick);

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
        <div class="info-element">      
        <p class="info-item">Vote / Votes</p>
        <p class="count" id="vote"><span class = "vote_accent">${Number(
          film.vote_average
        ).toFixed(1)}</span> / ${film.vote_count}</p>
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
        <p class="count">${film.genres.map(genre => genre.name).join(', ')}</p>
          </div>
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
    genresName = film.genres.map(genre => genre.name).join(', ');
    movieData = { ...film, genresName, release_date };
    comparisonQueue();
    comparisonWatched();
  });
  refs.backdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
  refs.backdrop.classList.add('scroll');
  closeModal();
}

function comparisonQueue() {
  refs.addQueued.textContent = 'add to queue';
  refs.addQueued.style.backgroundColor = '#fff';
  refs.addQueued.style.color = '#000';
  const savedData = storageApi.load(refs.QUEUED_KEY);
  if (savedData) {
    for (const el of savedData) {
      if (JSON.stringify(el) === JSON.stringify(movieData)) {
        refs.addQueued.textContent = 'remove from queue';
        refs.addQueued.style.backgroundColor = '#ff6b01';
        refs.addQueued.style.color = '#fff';
        break;
      }
    }
  }
}

function comparisonWatched() {
  refs.addWatched.textContent = 'add to watched';
  refs.addWatched.style.backgroundColor = '#fff';
  refs.addWatched.style.color = '#000';
  const savedDate = storageApi.load(refs.WATCHED_KEY);

  if (savedDate) {
    for (const el of savedDate) {
      if (JSON.stringify(el) === JSON.stringify(movieData)) {
        refs.addWatched.textContent = 'remove from watched';
        refs.addWatched.style.backgroundColor = '#ff6b01';
        refs.addWatched.style.color = '#fff';
        break;
      }
    }
  }
}

function closeModal() {
  document.addEventListener('click', e => {
    if (e.target === refs.backdrop) {
      refs.backdrop.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
      refs.backdrop.classList.remove('scroll');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      refs.backdrop.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
      refs.backdrop.classList.remove('scroll');
    }
  });
  refs.closeBtn.addEventListener('click', () => {
    refs.backdrop.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
    refs.backdrop.classList.remove('scroll');
  });
}

refs.addWatched.addEventListener('click', e => {
  if (e.target.textContent == 'remove from watched') {
    const savedData = storageApi.load(refs.WATCHED_KEY);
    for (let i = 0; i < savedData.length; i++) {
      if (JSON.stringify(savedData[i]) === JSON.stringify(movieData)) {
        savedData.splice(i, 1);
        console.log(savedData);
        storageApi.save(refs.WATCHED_KEY, savedData);
        Notify.info(`Film is remove from watched`);
        refs.addWatched.textContent = 'add to watched';
        refs.addWatched.style.backgroundColor = '#fff';
        refs.addWatched.style.color = '#000';
      }
    }
  } else {
    if (
      !storageApi.load(refs.WATCHED_KEY) ||
      storageApi.load(refs.WATCHED_KEY).length === 0
    ) {
      storageApi.save(refs.WATCHED_KEY, [movieData]);
      Notify.info(`Added to watched`, {
        background: '#ff6b01',
      });
      refs.addWatched.textContent = 'remove from watched';
      refs.addWatched.style.backgroundColor = '#ff6b01';
      refs.addWatched.style.color = '#fff';
      return;
    }
    const savedData = storageApi.load(refs.WATCHED_KEY);
    savedData.push(movieData);
    storageApi.save(refs.WATCHED_KEY, savedData);
    Notify.info(`Added to watched`);
    refs.addWatched.textContent = 'remove from watched';
    refs.addWatched.style.backgroundColor = '#ff6b01';
    refs.addWatched.style.color = '#fff';
  }

  refs.addWatched.removeEventListener;
});

refs.addQueued.addEventListener('click', e => {
  if (e.target.textContent == 'remove from queue') {
    const savedData = storageApi.load(refs.QUEUED_KEY);
    for (let i = 0; i < savedData.length; i++) {
      if (JSON.stringify(savedData[i]) === JSON.stringify(movieData)) {
        savedData.splice(i, 1);
        console.log(savedData);
        storageApi.save(refs.QUEUED_KEY, savedData);
        Notify.info(`Film is remove from Queue`);
        refs.addQueued.textContent = 'add to queue';
        refs.addQueued.style.backgroundColor = '#fff';
        refs.addQueued.style.color = '#000';
      }
    }
  } else {
    if (
      !storageApi.load(refs.QUEUED_KEY) ||
      storageApi.load(refs.QUEUED_KEY).length === 0
    ) {
      storageApi.save(refs.QUEUED_KEY, [movieData]);
      Notify.info(`Added to Queue`);
      refs.addQueued.textContent = 'remove from queue';
      refs.addQueued.style.backgroundColor = '#ff6b01';
      refs.addQueued.style.color = '#fff';
      return;
    }
    const savedData = storageApi.load(refs.QUEUED_KEY);
    savedData.push(movieData);
    storageApi.save(refs.QUEUED_KEY, savedData);
    Notify.info(`Added to Queue`);
    refs.addQueued.textContent = 'remove from queue';
    refs.addQueued.style.backgroundColor = '#ff6b01';
    refs.addQueued.style.color = '#fff';
  }

  refs.addQueued.removeEventListener;
});

Notify.init({
  timeout: 1200,
  cssAnimationStyle: 'zoom',
  info: {
    background: '#ff6b01',
  },
});
