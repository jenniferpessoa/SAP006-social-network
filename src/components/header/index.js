import { getError } from '../../Errors/index.js';
import { navigation } from '../../router.js';
import { signOut } from '../../services/index.js';
import { popUpNotice } from '../popup/index.js';

export function headerMenu() {
  const header = document.querySelector('header');

  // const rootMain = document.querySelector('.body');
  // rootMain.innerHTML = ''
  // console.log(rootMain);
  // const header = document.createElement('header');
  //header.classList.add('menu-header');
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
                <li class='menu-a' id='languages'>IDIOMAS</li>
                <li class='menu-a' id='logout'>SAIR</li>
            </ul>
        </nav>
        `;
  header.style.display = 'flex';

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
        // eslint-disable-next-line no-case-declarations
        const templateDeleteConfirmation = `
        <div>IDIOMAS
          <ul class="nav">
            <li><a id='pt-opt' class='lang-pt' title='Traduzir para português'>
              <img src='../../img/brazil.png' /></a></li>
            <li><a 'en-opt' class='lang-en' title='Translate to English'>
              <img src=src='../../img/united-states.png'  /></a></li>
            <li><a 'es-opt' class='lang-es' title='Traducir al español'>
              <img src=src='../../img/spain.png'/></a></li>
            <li><a 'fr-opt' class='lang-fr' title='Traduire en français'>
              <img src=src='../../img/france.png'/></a></li>
          </ul>
        </div>
        `;
        popUpNotice(templateDeleteConfirmation);
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
}
