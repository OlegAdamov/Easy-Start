const refs = {
  backTopBtn: document.querySelector('#back-top'),
  toggleBtn: document.querySelector('.toggle'),
  head: document.querySelector('.header_bgr'),
  form: document.querySelector('.search-form'),
  errorOutput: document.querySelector('.error-output'),
  headRefs: document.querySelectorAll('.header_href '),
  buttonsLibrary: document.querySelector('.buttons-library'),
};
const { height: searchContainer } = refs.head.getBoundingClientRect();

refs.backTopBtn.addEventListener('click', scrollToTop);

window.onscroll = function () {
  visabilityButtonSwitcher();
};

function visabilityButtonSwitcher() {
  if (
    document.body.scrollTop > 150 ||
    document.documentElement.scrollTop > 150
  ) {
    addStyleByScroll();
  } else {
    removeStyleByScroll();
  }
}

function scrollToTop() {
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  window.scrollBy({
    top: -scrollHeight,
    behavior: 'smooth',
  });
}
function addStyleByScroll() {
  document.body.style.paddingTop = `${searchContainer + 40}px`;
  refs.headRefs.forEach(headRef => headRef.classList.add('hidden-head-href'));
  refs.backTopBtn.style.display = 'block';
  refs.head.classList.add('fixed-header');
  refs.form.classList.add('fixed-form');
  refs.toggleBtn.classList.add('fixed-toggle');
  refs.toggleBtn.classList.remove('toggle');
  refs.errorOutput.classList.add('hidden-error');
  refs.errorOutput.style.top = '80px';
  refs.buttonsLibrary.classList.add('fixed-header__button');
}
function removeStyleByScroll() {
  document.body.style.paddingTop = '';
  refs.headRefs.forEach(headRef =>
    headRef.classList.remove('hidden-head-href')
  );
  refs.backTopBtn.style.display = 'none';
  refs.head.classList.remove('fixed-header');
  refs.form.classList.remove('fixed-form');
  refs.toggleBtn.classList.add('toggle');
  refs.toggleBtn.classList.remove('fixed-toggle');
  refs.errorOutput.classList.remove('hidden-error');
  refs.errorOutput.style.top = '';
  refs.buttonsLibrary.classList.remove('fixed-header__button');
}
