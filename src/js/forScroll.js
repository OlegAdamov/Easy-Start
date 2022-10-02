const refs = {
  backTopBtn: document.querySelector('#back-top'),
  toggleBtn: document.querySelector('.toggle'),
  head: document.querySelector('.header_bgr'),
  form: document.querySelector('.search-form'),
  errorOutput: document.querySelector('.error-output'),
}

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
    addStyleByScroll()
  } else {
    removeStyleByScroll()
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
  refs.backTopBtn.style.display = 'block';
  refs.head.classList.add('fixed-header');
  refs.form.classList.add('fixed-form');
  refs.toggleBtn.style.right = '256px'
  refs.toggleBtn.style.bottom = '30px'
  refs.errorOutput.style.top = '80px'
}
function removeStyleByScroll() {
  document.body.style.paddingTop = '';
  refs.backTopBtn.style.display = 'none';
  refs.head.classList.remove('fixed-header')
  refs.form.classList.remove('fixed-form');
  refs.toggleBtn.style.right = '20px'
  refs.toggleBtn.style.right = '20px'
  refs.errorOutput.style.top = ''
}