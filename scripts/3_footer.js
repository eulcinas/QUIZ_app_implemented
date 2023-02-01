// VARIABLES
const footerElement = document.querySelector('footer');
const currentYearElement = document.querySelector('#current-year');

//FUNCTIONS
const addBackground = () => {
  if (location.href.includes('index.html')) {
    footerElement.style.backgroundColor = 'var(--dark-color';
  } else if (location.href.includes('html.html')) {
    footerElement.style.backgroundColor = 'var(--html-color';
  } else if (location.href.includes('css.html')) {
    footerElement.style.backgroundColor = 'var(--css-color';
  } else if (location.href.includes('js.html')) {
    footerElement.style.backgroundColor = 'var(--js-color';
  }
};

const addDate = () => (currentYearElement.innerText = `© ${new Date().getFullYear()} | `);

//EVENTS
document.addEventListener('DOMContentLoaded', () => {
  addBackground();
  addDate();
});
