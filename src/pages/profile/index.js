/* eslint-disable no-tabs */
import {
  createHome, currentUser, getHome, uploadPicture, downloadPicture,
} from '../../services/index.js';
import { headerMenu } from '../../components/header/index.js';

export const Profile = () => {
  headerMenu();
  const loggedUser = currentUser();
  const loggeduserId = loggedUser.uid;

  const root = document.createElement('div');
  root.classList.add('root-profile');
  root.innerHTML = `
	<main class='profile-container row'>
    <section class='profile-form col-11'>
      <form>
        <fieldset class='fieldset-container'>
					<legend class='legend'> Seu Perfil </legend>
          <section class='profile-image-container col-4'>
            <label class='label-image'>
            <input type='file' name='arquivo'>

            <figure class='profile-figure'>
              <img src='img/avatar.png' class='avatar-image'>
            <figcaption class='avatar-figcaption'>
                <img src='img/camera-figcaption.png'>
              </figcaption>
            </figure>
          </section>

					<div class='form-fields col-9 '>
            <p>Nome Completo:
              <input id='name' type='name' class='input-item' value='${loggedUser.displayName}'>
            </p>

            <p>Localização:
              <input id='localization' type='localization' class='input-item' value='${null}'>
            </p>

            <p>Nome e Modelo do Barco:
              <input id='boat' type='name' class='input-item' value='${null}'>
            </p>

            <p>Email:
              <input id='email' type='name' class='input-item' value='${loggedUser.email}' disabled>
            </p>

            <div class='redefinition'>
              <a href='#' id='reset'>Redefinir senha</a>
            </div>

            <nav class='btn-profile-container'>
              <button type='submit' id='saveBtn' class='saveBtn'>Atualizar</button>
            </nav>
				  </div>
        </fieldset>
      </form>
    </section>
  </main>
  `;

  // upload da imagem:  storage.ref(`images/${loggeduserId}`).put(file);
  // video sobre o upload https://www.youtube.com/watch?v=dEG6IqpBfN4&ab_channel=DankiCode
  // video sobre o download url também https://www.youtube.com/watch?v=ZH-PnY-JGBU&ab_channel=TACV-TheAmazingCode-Verse

  const inputPhoto = root.querySelector('input[type=file]');
  const imageProfile = root.querySelector('.avatar-image');

  function showPhoto() {
    const photoUser = loggedUser.photoURL;
    // console.log('passou por aqui', loggedUser)
    if (photoUser) {
      imageProfile.src = photoUser;
    }
  }

  showPhoto();

  inputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];

    uploadPicture(loggeduserId, file).then(() => {
      downloadPicture(loggeduserId).then((url) => {
        const imgUrl = url;

        loggedUser.updateProfile({
          photoURL: imgUrl,
        });
        showPhoto();
      });
    });
  });

  const saveButton = root.querySelector('#saveBtn');
  const name = root.querySelector('#name');
  const boat = root.querySelector('#boat');
  const reset = root.querySelector('#reset');
  const localization = root.querySelector('#localization');

  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const infoUser = {
      localization: localization.value,
      boat: boat.value,
      userId: loggedUser.uid,
    };

    loggedUser.updateProfile({
      displayName: name.value,
    });
    createHome(infoUser);
  });

  function getInfo() {
    getHome(loggedUser.uid).then((infoUser) => {
      infoUser.docs.forEach((doc) => {
        const boatInfo = root.querySelector('#boat');
        const localizationInfo = root.querySelector('#localization');
        boatInfo.value = `${doc.data().boat}`;
        localizationInfo.value = `${doc.data().localization}`;
      });
    });
  }

  reset.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.replace('/reset');
  });

  getInfo();
  return root;
};
