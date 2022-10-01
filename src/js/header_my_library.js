const refHome = document.querySelector('#ref_home');
const refMyLibrary = document.querySelector('#ref_my-library');
const formPdg = document.querySelector('.form_pdg');
const buttonsPdg = document.querySelector('.buttons_pdg');

refMyLibrary.addEventListener('click', onRefMyLibrary);
refHome.addEventListener('click', onRefHome);
console.log(formPdg);

function onRefMyLibrary(evt) {
  evt.preventDefault();

  refHome.classList.remove('current');
  refMyLibrary.classList.add('current');
  buttonsPdg.classList.remove('visually-hidden');
  formPdg.classList.add('visually-hidden');
}

function onRefHome(evt) {
  evt.preventDefault();
  refHome.classList.add('current');
  refMyLibrary.classList.remove('current');
  buttonsPdg.classList.add('visually-hidden');
  formPdg.classList.remove('visually-hidden');
}
