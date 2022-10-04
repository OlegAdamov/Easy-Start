export default function loader() {
  const loader = document.getElementById('preloader');
  loader.style.display = 'flex';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 800);
}
