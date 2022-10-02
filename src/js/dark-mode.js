// const icon = document.querySelector('.icon')
// const body = document.querySelector('body')
// console.log(icon);
// console.log(body);
// icon.addEventListener('click', onChangeColor)

// function onChangeColor() {
//     body.classList.toggle('darkTheme')

// }
window.addEventListener('load', onLoad);
const toggle = document.getElementById('switch');

toggle.addEventListener('click', darkMode);

function darkMode() {
  const body = document.querySelector('body');
  const wasDarkmode = localStorage.getItem('darkmode') === 'true';
  localStorage.setItem('darkmode', !wasDarkmode);
  body.classList.toggle('darkTheme', !wasDarkmode);
  saveCheckbox();
}

function onLoad() {
  document.body.classList.toggle(
    'darkTheme',
    localStorage.getItem('darkmode') === 'true'
  );
}

// TODO: Code should not be executed as a script
let checked = JSON.parse(localStorage.getItem('checkbox1zaal1'));
if (checked == true) {
  document.getElementById('switch').checked = true;
}

function saveCheckbox() {
  let checkbox = document.querySelector('#switch');
  localStorage.setItem('checkbox1zaal1', checkbox.checked);
}
