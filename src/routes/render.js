import { routes } from './config.js';

export const routeRender = () => {
  const elements = document.getElementById('root');

  elements.innerHTML = '';
  elements.appendChild(routes[window.location.pathname]());
};
