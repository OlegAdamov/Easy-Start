import FilmAPIService from './feach/FilmAPIService';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const filmsApi = new FilmAPIService();
const paginationContainer = document.querySelector('.tui-pagination');
const searchForm = document.getElementById('search-form');
const btnList = document.querySelector('.gallery');

const options = {
  totalItems: 0,
  itemsPerPage: 21,
  visiblePages: 5,
  page: 1,
};
export const pagination = new Pagination('pagination', options);
const page = pagination.getCurrentPage();
