const refs = {
  head: document.querySelector('.header_bgr'),
};

const defaultOffset = 600;

const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => refs.head.classList.contains('hide');
const fixedHeader = () => refs.head.classList.contains('fixed-header');

let lastScroll = 0;

window.addEventListener('scroll', hidingHeader);

function conditionalClassAdd() {
  if (
    scrollPosition() > lastScroll &&
    !containHide() &&
    scrollPosition() > defaultOffset
  ) {
    refs.head.classList.add('hide');
  } else if (scrollPosition() < lastScroll && containHide()) {
    refs.head.classList.remove('hide');
  }
  lastScroll = scrollPosition();
}
window.onresize = function () {
  hidingHeader();
};

function hidingHeader() {
  if (window.innerWidth < 768 && fixedHeader()) {
    conditionalClassAdd();
  }
}
