import {
  signOut, currentUser, infoBoat,
} from '../../services/index.js';

export function headerMenuFeed() {
  const user = currentUser();
  const idUser = user.uid;
  const photo = user.photoURL;
  const rootMain = document.querySelector('.root');
  rootMain.innerHTML = '';
  const header = document.createElement('header');
  header.classList.add('menu-header');
  header.innerHTML = `
        <div class='menu'>
          <img src="./img/logo_menu.png" alt='BomBordo' class='logo-header' id='feed'/>
        <div class="navProfile" id="navProfile">
        <button type="button" class="profile" id="profile" >PERFIL</button>
        <img class="profilePhoto" id="profilePhoto" src="" alt="Foto do Perfil">
        <p class="userName">${user.displayName}</p>
        <p class="boatName" id="boat"></p>
        </div>
        <button class="btnLogout" id="logout"> SAIR </button>
        </div>
        </nav>
        `;

  rootMain.prepend(header);

  infoBoat(idUser).then((snapshot) => {
    const homeData = snapshot.data();
    const boat = homeData.boat;
    const info = rootMain.querySelector('#boat');
    info.innerHTML = `Veleiro: ${boat}`;
  });

  const imgProfile = rootMain.querySelector('#profilePhoto');
  imgProfile.src = photo;

  const nav = document.querySelector('.menu-nav');

  header.addEventListener('click', (event) => {
    const optionMenu = event.target.id;
    switch (optionMenu) {
      case 'profile':
        window.history.pushState('nulo', 'nulo', '/profile');
        const popStateEvent = new PopStateEvent('popstate', {});
        dispatchEvent(popStateEvent);
        break;

      case 'logout':
        signOut();
        break;

      case 'feed':
        window.history.pushState('nulo', 'nulo', '/feed');
        const popSStateEvent = new PopStateEvent('popstate', {});
        dispatchEvent(popSStateEvent);
        break;
      default:
        return; // ele precisa retornar algo que mantenha o usuário na tela atual
    }
    nav.classList.remove('active');
  });
}
