import FilmAPIService from './feach/FilmAPIService';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import moviesMurkup from '../templates/movi-card.hbs';
import remakeGenres from './feach/remake-genres-ids';

const filmsApi = new FilmAPIService();
const paginationContainer = document.querySelector('.tui-pagination');
const searchForm = document.getElementById('search-form');
const btnList = document.querySelector('.gallery');

const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination('pagination', options);

const page = pagination.getCurrentPage();
filmsApi
  .getPopularMovie()
  .then(res => {
    const markup = moviesMurkup(res);
    pagination.reset(res.data.total_results);
    paginationContainer.classList.remove('is-hidden');
  })
  .catch(error => {
    error;
  });
pagination.on('afterMove', getMoreVideo);
function getMoreVideo(event) {
  const currentPage = event.page;
  filmsApi.page = currentPage;
  filmsApi
    .getPopularMovie()
    .then(results => {
      const markup = results.data.results
        .map(movie => moviesMurkup(movie))
        .join('');
      btnList.innerHTML = markup;
    })
    .catch(error => {
      console.log(error);
    });
}

