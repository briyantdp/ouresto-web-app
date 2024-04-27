/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime';
import '../styles/main.scss';
import App from './views/app';
import swRegister from './utils/sw-register';

// Components Application Shell
import './views/components/header';
import './views/components/footer';

const app = new App({
  hamburgerButton: document.querySelector('#hamburger-btn'),
  closeButton: document.querySelector('.close-btn'),
  drawer: document.querySelector('nav'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  swRegister();
});

window.addEventListener('load', () => {
  setTimeout(() => {
    app.renderPage();
  }, 2500);
});
