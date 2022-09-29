import Glide from '@glidejs/glide';
// import templateFunction from './templates.hbs';
// import filmsCardSliderTpl from './templates/slider.hbs';

// document.body.innerHTML = templateFunction();
// const sliderContainer = document.querySelector('.js-slider-container');
renderTrendy();

// const filmsCardSlider = new filmsCardSlider();

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
      sliderContainer.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

function renderSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSlider(articles);
}
