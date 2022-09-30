import FilmAPIService from './feach/FilmAPIService';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { createGalleryMarkup } from './gallery';
import { refs } from './gallery';
import 'tui-pagination/dist/tui-pagination.min.css';

const filmsApi = new FilmAPIService();
// const listRef = document.querySelector('.js-gallery');
const paginationContainer = document.querySelector('.tui-pagination');
const searchForm = document.getElementById('search-form');
const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination('pagination', options);

const page = pagination.getCurrentPage();
console.log('page', page);
filmsApi
  .getPopularMovie(page)
  .then(res => {
    pagination.reset(res.data.total_results);
    // paginationContainer.classList.remove('is-hidden');
    // const markup = getPopularMovie(results);
    // listRef.innerHTML = markup;

    // let selected = document.querySelector('.tui-is-selected');
    // console.log(selected.innerHTML);
  })
  .catch(error => {
    error;
  });
pagination.on('afterMove', event => {
  const currentPage = event.page;
  console.log(currentPage);
});
pagination.on('beforeMove', event => {
  const currentPage = event.page;
  //   pagination.reset(currentPage);
  pagination.movePageTo(10);
});
filmsApi.getPopularMovie(currentPage).then(({ results }) => {
  const markup = getPopularMovie(results);
  listRef.innerHTML = markup;
});
