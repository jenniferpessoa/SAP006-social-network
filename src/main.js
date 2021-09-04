import { routeRender } from './routes/render.js';

window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender);
