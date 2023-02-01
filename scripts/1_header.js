// VARIABLES
const headerElement = document.querySelector('header');

//FUNCTIONS
const createNavigation = () => {
  // -- creating navigation elements
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  const li1 = document.createElement('li');
  const li2 = document.createElement('li');
  const li3 = document.createElement('li');
  const li4 = document.createElement('li');
  const a1 = document.createElement('a');
  const a2 = document.createElement('a');
  const a3 = document.createElement('a');
  const a4 = document.createElement('a');

  // -- adding links to menu items
  a1.href = location.href.includes('index') ? './index.html' : '../index.html';
  a2.href = location.href.includes('index') ? './pages/html.html' : './html.html';
  a3.href = location.href.includes('index') ? './pages/css.html' : './css.html';
  a4.href = location.href.includes('index') ? './pages/js.html' : './js.html';

  // -- adding text to menu items
  a1.innerHTML = `<i class="fas fa-home"></i>`;
  a2.innerText = 'HTML Quiz';
  a3.innerText = 'CSS Quiz';
  a4.innerText = 'JavaScript Quiz';

  // -- appending elements
  li1.appendChild(a1);
  li2.appendChild(a2);
  li3.appendChild(a3);
  li4.appendChild(a4);

  ul.append(li1, li2, li3, li4);

  nav.appendChild(ul);

  headerElement.appendChild(nav);

  // -- changing header background color based on page
  if (location.href.includes('index.html')) {
    headerElement.style.backgroundColor = 'var(--dark-color)';
  } else if (location.href.includes('html.html')) {
    headerElement.style.backgroundColor = 'var(--html-color)';
  } else if (location.href.includes('css.html')) {
    headerElement.style.backgroundColor = 'var(--css-color)';
  } else if (location.href.includes('js.html')) {
    headerElement.style.backgroundColor = 'var(--js-color)';
  }
};

//EVENTS
document.addEventListener('DOMContentLoaded', createNavigation);
