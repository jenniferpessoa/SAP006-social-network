import { infoUser } from '../../services/index.js';

export const profileFeed = (root, idUser, name, email, photo) => {
  const profileContainer = document.createElement('aside');
  profileContainer.classList.add('profile-feed');
  profileContainer.innerHTML = ` 
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
        <li class="userSave"><i data-savePos type='button' id='savePost' class="fas fa-anchor"></i></li>        
      </ul>
    </div>
  </div>
`;
  root.prepend(profileContainer);

  infoUser(idUser).then((snapshot) => {
    if (!snapshot.data().boat || !snapshot.data().localization) {
    root.querySelector('.userBoat').style.display = 'none';
    root.querySelector('.userLocalization').style.display = 'none';
    } else {
    root.querySelector('.userBoat').innerHTML = `Veleiro: ${snapshot.data().boat}`;
    root.querySelector('.userLocalization').innerHTML = `Local: ${snapshot.data().localization}`;
    }
  });

  if (photo) {
    const userPictureProfileFeed = root.querySelector('.userPicture');
    userPictureProfileFeed.src = photo;
  }
  if (!name) {
    root.querySelector('.userName').innerHTML = `Atualize o seu perfil`;
  }
 
  return root;
};
