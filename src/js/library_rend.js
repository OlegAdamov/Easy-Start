const gallery = document.querySelector('.gallery');
const watchedBtn = document.querySelector('#btn_watched');
const queueBtn = document.querySelector('#btn_queue');

const localStorageWatched = JSON.parse(
  localStorage.getItem('watched-films-list')
);
const localStorageQueue = JSON.parse(localStorage.getItem('queued-films-list'));
watchedBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  renderWatchedGalleryMarkup();
});

queueBtn.addEventListener('click', () => {
  gallery.innerHTML = null;
  renderQueueGalleryMarkup();
});

function renderQueueGalleryMarkup() {
  gallery.insertAdjacentHTML('beforeend', createQueueMarkup());
}

function renderWatchedGalleryMarkup() {
  gallery.insertAdjacentHTML('beforeend', createWatchedMarkup());
}

function createWatchedMarkup() {
  let filmsWatchedMarkup = '';

  localStorageWatched.map(({ poster, title }) => {
    filmsWatchedMarkup += ` <li id ="" class="gallery__item">
        <a href="/" class="gallery__link">
            <img src="https://image.tmdb.org/t/p/w500${poster}" alt="" class="gallery__img">

           <h2 class="gallery__title">${title}</h2>
            <div class ="discription"><p class="gallery__discription">$</p>
            </div>
        </a>
    </li>`;
  });
}

function createQueueMarkup() {
  let filmsWatchedMarkup = '';

  localStorageQueue.map(({ poster, title }) => {
    filmsWatchedMarkup += ` <li id ="" class="gallery__item">
        <a href="/" class="gallery__link">
            <img src="https://image.tmdb.org/t/p/w500${poster}" alt="" class="gallery__img">

           <h2 class="gallery__title">${title}</h2>
            <div class ="discription"><p class="gallery__discription">$</p>
            </div>
        </a>
    </li>`;
  });
}
