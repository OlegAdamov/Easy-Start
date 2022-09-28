const icon = document.querySelector('.icon')
const body = document.querySelector('body')
console.log(icon);
console.log(body);
icon.addEventListener('click', onChangeColor)

function onChangeColor() {
  body.classList.toggle('darkTheme')  
}