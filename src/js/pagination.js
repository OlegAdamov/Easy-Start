// import FilmAPIService from './feach/FilmAPIService';
// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.min.css';
import { createGalleryMarkup } from './gallery';
import { refs } from './gallery';
import getPopularMovie from './feach/FilmAPIService';
// const filmsApi = new FilmAPIService();
const listRef = document.querySelector('.js-gallery');
const paginationContainer = document.querySelector('.tui-pagination');
const searchForm = document.getElementById('search-form');
const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
};

// const pagination = new Pagination('pagination', options);

const page = pagination.getCurrentPage();
console.log('page', page);
filmsApi.getPopularMovie(page).then(res => {
  pagination.reset(res.data.total_results);

  // paginationContainer.classList.remove('is-hidden');
  // const markup = getPopularMovie(results);
  // listRef.innerHTML = markup;

  // let selected = document.querySelector('.tui-is-selected');
  // console.log(selected.innerHTML);
  // const pbtn = document.querySelectorAll('a.tui-page-btn');
  // pbtn.addEventListener('click', e => {
  //   filmsApi.page = e.currentTarget.innerHTML;
  //   console.log(filmsApi.page);
  //   pagination.reset(res.data.total_results);
  // });
});
// .catch(error => {
//   console.log(error);
// });
// pagination.on('afterMove', getMoreVideo);

// function getMoreVideo(event) {
//   const currentPage = event.page;
//   filmsApi
//     .getPopularMovie(currentPage)
//     .then(({ results }) => {
//       const markup = getPopularMovie(results);
//       listRef.innerHTML = markup;
//     })
//     .catch(error => {
//       console.log(error);
//       paginationContainer.classList.add('is-hidden');
//     });
// }

// refs.searchForm.addEventListener('submit', handleSubmit);

// function handleSubmit(event) {
//   event.preventDefault();
//   const {
//     elements: { genres },
//   } = event.currentTarget;
//   if (!genres.value) {
//     console.log('Enter data');
//     return;
//   }

//   pagination.off('afterMove', getMoreVideo);
//   pagination.off('afterMove', getMoreSearchVideo);
//   pagination.on('afterMove', getMoreSearchVideo);
//   filmsApi.genres = genres.value;
//   filmsApi
//     .getSearchVideo(page)
//     .then(({ total, results }) => {
//       if (total === 0) {
//         paginationContainer.classList.add('is-hidden');
//         listRef.innerHTML = '';
//         return;
//       }
//       const markup = getPopularMovie(results);
//       listRef.innerHTML = markup;
//       pagination.reset(total);
//       paginationContainer.classList.remove('is-hidden');
//     })
//     .catch(error => {
//       console.log(error);
//       paginationContainer.classList.add('is-hidden');
//     });
//   console.log(query.value);
// }

// function getMoreSearchVideo(event) {
//   const currentPage = event.page;
//   filmsApi.getSearchVideo(currentPage).then(({ results }) => {
//     const markup = createGalleryMarkup(results);
//     listRef.innerHTML = markup;
//   });
// }
