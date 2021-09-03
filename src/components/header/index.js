import { getError } from '../../Errors/index.js';
import { navigation } from '../../routes/navigation.js';
import { signOut } from '../../services/index.js';
import { translate } from '../translate/index.js';

export function headerMenu() {
  const main = document.querySelector('.root');
  main.innerHTML = '';
  const header = document.createElement('header');
  header.classList.add('menu-header');
  header.innerHTML = `
        <figure>
          <img src='./img/logo-header.png' alt='A bordo' class='logo-header' id='feed'/>
        </figure>
        <nav class='menu-nav'>
            <button class='btn-mobile'>
                <span class='hamburguer'></span>
            </button>
            <ul class='menu'>
                <li class='menu-a' id='profile'>PERFIL</li>
                <li class='menu-a' id='languages'>IDIOMAS
                  <ul id='google_translate_element' data-lang class='nav'>
                    <li><a data-pt class='lang-pt' title='Traduzir para português'>
                      <img class='flag' src='../../img/brazil.png' />Português</a></li>
                    <li><a data-en class='lang-en' title='Translate to English'>
                      <img class='flag' src='../../img/united-states.png'/>English</a></li>
                    <li><a data-es class='lang-es' title='Traducir al español'>
                      <img class='flag' src='../../img/spain.png'/>Español</a></li>
                    <li><a data-fr class='lang-fr' title='Traduire en français'>
                      <img class='flag' src='../../img/france.png'/>Français</a></li>
                  </ul>
                </li>  
                <li class='menu-a' id='logout'>SAIR</li>
            </ul>
        </nav>
        `;
  main.prepend(header);

  const btnMobile = document.querySelector('.btn-mobile');
  const nav = document.querySelector('.menu-nav');

  function toggleMenu(event) {
    if (event.type === 'touchstart') {
      event.preventDefault();
    }
    nav.classList.toggle('active');
  }

  btnMobile.addEventListener('click', toggleMenu);
  btnMobile.addEventListener('touchstart', toggleMenu);

  header.addEventListener('click', (event) => {
    const optionMenu = event.target.id;
    switch (optionMenu) {
      case 'profile':
        window.history.pushState('nulo', 'nulo', '/profile');
        // eslint-disable-next-line no-case-declarations
        const popStateEvent = new PopStateEvent('popstate', {});
        dispatchEvent(popStateEvent);
        break;

      case 'languages':
        translate();
        break;

      case 'logout':
        signOut().then(() => {
          navigation('/');
        }).catch((error) => {
          getError(error);
        });
        break;

      case 'feed':
        window.history.pushState('nulo', 'nulo', '/feed');
        // eslint-disable-next-line no-case-declarations
        const popSStateEvent = new PopStateEvent('popstate', {});
        dispatchEvent(popSStateEvent);
        break;
      default:
        return; // ele precisa retornar algo que mantenha o usuário na tela atual
    }
    nav.classList.remove('active');
  });
  return header;
}
