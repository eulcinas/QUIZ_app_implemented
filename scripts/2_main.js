// VARIABLES
const wrapperElement = document.querySelector('.wrapper');

//FUNCTIONS
const addBackground = () => {
  if (location.href.includes('html.html')) {
    wrapperElement.style.backgroundColor = 'var(--html-color';
  } else if (location.href.includes('css.html')) {
    wrapperElement.style.backgroundColor = 'var(--css-color';
  } else if (location.href.includes('js.html')) {
    wrapperElement.style.backgroundColor = 'var(--js-color';
  }
};

//EVENTS
document.addEventListener('DOMContentLoaded', (addBackground) => {});
