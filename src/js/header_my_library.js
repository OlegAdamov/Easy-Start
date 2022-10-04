import loader from './loader';
const refHome = document.querySelector('#activ-homeJs');
const refMyLibrary = document.querySelector('#activ-libraryJs');
const formPdg = document.querySelector('.form_pdg');
const buttonsPdg = document.querySelector('.buttons-library');
const header = document.querySelector('.header_bgr');
refMyLibrary.addEventListener('click', onRefMyLibrary);
refHome.addEventListener('click', onRefHome);

function onRefMyLibrary(evt) {
  evt.preventDefault();
  loader();
  header.classList.add('header_lib__bgr');
  refHome.classList.remove('current');
  refMyLibrary.classList.add('current');
  buttonsPdg.classList.remove('visually-hidden');
  formPdg.classList.add('visually-hidden');
}

function onRefHome(evt) {
  evt.preventDefault();
  header.classList.remove('header_lib__bgr');
  refHome.classList.add('current');
  refMyLibrary.classList.remove('current');
  buttonsPdg.classList.add('visually-hidden');
  formPdg.classList.remove('visually-hidden');
}
