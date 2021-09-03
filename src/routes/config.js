import { Feed } from '../pages/feed/index.js';
import { Login } from '../pages/singin/login.js';
import { Profile } from '../pages/profile/index.js';
import { Reset } from '../pages/singin/reset.js';
import { SignUp } from '../pages/singin/register.js';

export const routes = {
  '/': Login,
  '/signup': SignUp,
  '/feed': Feed,
  '/profile': Profile,
  '/reset': Reset,
};
