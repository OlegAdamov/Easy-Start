const backTopBtn = document.querySelector('#back-top');
refs.backTopBtn.addEventListener('click', scrollToTop);

window.onscroll = function () {
  visabilityButtonSwitcher();
};

function visabilityButtonSwitcher() {
  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    refs.backTopBtn.style.display = 'block';
  } else {
    refs.backTopBtn.style.display = 'none';
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
