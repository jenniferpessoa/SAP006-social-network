import { Feed } from './pages/feed/index.js';
import { Login } from './pages/login/index.js';
import { Profile } from './pages/profile/index.js';
import { Reset } from './pages/reset/index.js';
import { SignUp } from './pages/signup/index.js';
import { Welcome } from './pages/onboarding/welcome.js';
import { Conecte } from './pages/onboarding/conecte.js';
import { Comunique } from './pages/onboarding/comunique.js';

const routeRender = () => {
  const elements = document.getElementById('root');
  const auth = firebase.auth();
  let path = window.location.pathname;

  const routes = {
    '/': Welcome,
    '/welcome': Welcome,
    '/conecte': Conecte,
    '/comunique': Comunique,
    '/login': Login,
    '/signup': SignUp,
    '/feed': Feed,
    '/profile': Profile,
    '/reset': Reset,
  };

  auth.onAuthStateChanged((user) => {
    if (!user && (path !== '/signup' || path !== '/login')) {
      window.history.replaceState(null, null, path);
    }
    if (user && (path === '/' || path === '/login' || path === '/signup')) {
      path = '/feed';
      window.history.replaceState(null, null, path);
    }
    if (!user && (path === '/feed')) {
      path = '/login';
      window.history.replaceState(null, null, path);
      // window.location.reload();
    }

    elements.innerHTML = '';
    elements.appendChild(routes[path]());
  });
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender);

export const navigation = (path, state = {}) => {
  window.history.pushState(state, null, path);

  const popStateEvent = new PopStateEvent('popstate', { state });
  dispatchEvent(popStateEvent);
};
