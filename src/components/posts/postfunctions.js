/* eslint-disable spaced-comment */
import {
  deletePostFeed, likePost, getLikes, unlikePost, getComments, /*deletePostComment,*/
} from '../../services/index.js';
import { modal } from '../popup/index.js';

function dateFormat(date) {
  const optionsDate = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: false,
   };

  return new Intl.DateTimeFormat('pt-br', optionsDate).format(date);

  //console.log(new Intl.DateTimeFormat('en-US', optionsDate).format(date));
  // → "12/19/2012, 19:00:00"
}

const deletePost = (idPost, post) => {
  modal.confirm('Essa postagem será excluída, deseja continuar?', () => {
    // const postDiv = rootElement.querySelector(`[data-id="${deleteId}"]`);
    deletePostFeed(idPost).then(() => post.remove());
  });
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

// const deleteComment = (idPost, comment, commentUL, commentLi) => {
//   commentUL.removeChild(commentLi);
//   deletePostComment(idPost, comment);
// };

const commentsPost = (idPost, container) => {
  getComments(idPost).then((snapshot) => {
    const commentsArray = snapshot.data().comments;

    commentsArray.forEach((comment) => {
      const commentLi = document.createElement('li');
      // const commentId = comment.date.replaceAll(/[/: ]/g, '');
      commentLi.classList.add('elementComment');
      const commentTemplate = `
      <div class="positionComment">
        <p class="textComment">${comment.text}</p>
        <div class="sectionImgComment">
          <figure class="comment-avatar"><img class='imgUserComment' src="../../img/profileImg.png" width="30px"></figure>
          
        <section class="sectionInfoUserComment">
          <h class="nameUserComment">${comment.name}</h>
          <time class="dateComment">${comment.date}</time>
        </section>
        </div>
      </div>  
        `;
      commentLi.innerHTML = commentTemplate;

      const picturePost = commentLi.querySelector('.imgUserComment');

      if (comment.photo) {
        picturePost.src = comment.photo;
      }
      container.prepend(commentLi);
    });
  });
};

const savePost = () => {
  console.log('oi')
}

export { deletePost, sendLike, commentsPost, savePost, dateFormat };
