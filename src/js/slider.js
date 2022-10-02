import Glide from '@glidejs/glide';
import filmsCardSliderTpl from '../templates/slider.hbs';
import { onGalleryClick } from './modal_main';

const sliderContainer = document.querySelector('.js-slider-container');
renderTrendy();
const filmsCardSlider = new filmsCardSliderTpl();

sliderContainer.addEventListener('click', onGalleryClick);

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 2000,
  hoverpause: true,
  bound: true,
});

glide.mount();

function renderTrendy() {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=ba12bbb2efd4020faab2c5dd14dc19c0`;
  return fetch(url)
    .then(response => response.json())
    .then(({ results }) => {
      return results;
    })
    .then(renderSliderFilms)
    .catch(err => {
      console.log('err');
      // sliderContainer.innerHTML = `<img class="catch-error-pagination" src="https://ik.imagekit.io/tc8jxffbcvf/default-movie-portrait_EmJUj9Tda5wa.jpg?tr=fo-auto,di-"  />`;
    });
}

function renderSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
}
