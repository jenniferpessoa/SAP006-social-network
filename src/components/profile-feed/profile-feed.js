import { infoUser } from '../../services/index.js';
import { weather } from '../weather/index.js';

export const profileFeed = (root, idUser, name, email, photo) => {
  const rootPf = root;
  const asideContainer = document.createElement('aside');
  asideContainer.classList.add('aside-info');
  asideContainer.innerHTML = ` 
  <section class='profile-feed'>
    <div class="profileInfoFeed col-md-3">
      <div class="panel">
        <div class="user-heading round">
          <figure class='feedProfilePicture'>            
            <img class='userPicture' src="profileImg.png" alt="">
          </figure>
          <h1 class='userName'>${name}</h1>
          <p class='userEmail'>${email}</p>
        </div>
        <ul class="userInfoProfileFeed nav-pills nav-stacked">
          <li class="userLocalization"></li>
          <li class="userBoat"></li>
          <li class="userSave">Salvos</li>        
        </ul>
      </div>
    </div>
  </section>
`;
  weather(asideContainer);
  root.prepend(asideContainer);

  infoUser(idUser).then((snapshot) => {
    rootPf.querySelector('.userBoat').innerHTML = `Veleiro: ${snapshot.data().boat}`;
    rootPf.querySelector('.userLocalization').innerHTML = `Local: ${snapshot.data().localization}`;
  });

  if (photo) {
    const userPictureProfileFeed = root.querySelector('.userPicture');
    userPictureProfileFeed.src = photo;
  }
  if (!name) {
    rootPf.querySelector('.userName').innerHTML = 'Atualize o seu perfil';
  }

  return root;
};
