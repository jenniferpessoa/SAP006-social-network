/* eslint-disable import/no-cycle */
import { Feed } from './pages/feed/index.js';
import { Login } from './pages/singin/login.js';
import { Profile } from './pages/profile/index.js';
import { Reset } from './pages/singin/reset.js';
import { SignUp } from './pages/singin/register.js';

const routeRender = () => {
  const elements = document.getElementById('root');
  const routes = {
    '/': Login,
    '/signup': SignUp,
    '/feed': Feed,
    '/profile': Profile,
    '/reset': Reset,
  };

  elements.innerHTML = '';
  elements.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  routeRender();
});

export function navigation(path) {
  window.history.pushState({}, '', path);
  const popStateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popStateEvent);
}
