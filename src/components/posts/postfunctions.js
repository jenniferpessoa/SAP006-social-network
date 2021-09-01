/* eslint-disable spaced-comment */
import {
  deletePostFeed, likePost, getLikes, unlikePost,
} from '../../services/index.js';
import { modal } from '../popup/index.js';

const deletePost = (idPost, post) => {
  modal.confirm('Essa postagem será excluída, deseja continuar?', () => {
    // const postDiv = rootElement.querySelector(`[data-id="${deleteId}"]`);
    deletePost(idPost);
    post.remove();
  });


  // const root = document.querySelector('.root');
  // const popupContainer = document.createElement('div');
  // popupContainer.innerHTML = ` 
  //     <div class='popup-wrapper'>
  //       <div class='popup'>
  //         <div class='popup-content'>
  //           <div id='yes' class='yes'>SIM</div>
  //           <div id='no' class='não'>NAO</div>
  //         </div>                
  //       </div>
  //     </div>
  //   `;
  // root.appendChild(popupContainer);

  // const popup = root.querySelector('.popup-wrapper');
  // const popUpContent = root.querySelector('.popup-content');

  // function exibeModal() {
  //   popup.style.display = 'block';
  // }
  // exibeModal();

  // popUpContent.addEventListener('click', (event) => {
  //   const answerUser = event.target.id;

  //   if (answerUser === 'yes') {
  //     deletePostFeed(idPost);
  //     post.remove();
  //     popup.style.display = 'none';
  //   } else {
  //     popup.style.display = 'none';
  //   }
  // });
  // return root;
};

const sendLike = (idUser, idPostClicked, numLikes, likeIcon) => {
  const likesNumber = Number(numLikes.innerText);
  const likesElement = numLikes;
  getLikes(idPostClicked).then((post) => {
    if (!post.data().likes.includes(idUser)) {
      likePost(idUser, idPostClicked).then(() => {
        likesElement.innerHTML = likesNumber + 1;
        likeIcon.classList.replace('far', 'fas');
      }).catch('error');
    } else {
      unlikePost(idUser, idPostClicked).then(() => {
        likesElement.innerHTML = likesNumber - 1;
        likeIcon.classList.replace('fas', 'far');
      }).catch('error');
    }
  }).catch('error');
};

export { deletePost, sendLike };
