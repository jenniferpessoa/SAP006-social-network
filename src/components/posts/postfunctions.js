/* eslint-disable spaced-comment */
import {
  currentUser, deletePostFeed, likePost, getLikes, unlikePost, getComments, deleteCommentFeed,
  savePost
} from '../../services/index.js';
import { modal } from '../popup/index.js';

// new Intl.DateTimeFormat('pt-br', optionsDate).format(date);
  //console.log(new Intl.DateTimeFormat('en-US', optionsDate).format(date));
  // → "12/19/2012, 19:00:00"


const deletePost = (idPost, post) => {
  modal.confirm('Essa postagem será excluída, deseja continuar?', () => {
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

const displayComments = (id) => {
  const sectionComments = document.getElementById(id);
  sectionComments.classList.toggle('active');
  return sectionComments;
};

const deleteComment = (idPost, comment, commentLi) => {
  modal.confirm('Essa postagem será excluída, deseja continuar?', () => {
    deleteCommentFeed(idPost, comment).then(() => commentLi.remove());
  });
};

const printComment = (comment, containerComment) => {
  const commentId = comment.id;
  const postCommentId = comment.data().idPost;

  const commentLi = document.createElement('li');
  commentLi.classList.add('elementComment');
  commentLi.setAttribute('data-comment', `${commentId}`);

  const commentTemplate = `
      <div class="positionComment">
        <p class="textComment">${comment.data().text}</p>
        <div class="sectionImgComment">
          <figure class="comment-avatar"><img class='imgUserComment' src="../../img/profileImg.png" width="30px"></figure>
          
        <section class="sectionInfoUserComment">
          <h class="nameUserComment">${comment.data().name}</h>
          <time class="dateComment">${comment.data().date}</time>
        </section>
        <i data-btnLiComment='${commentId}' type='button' id='delete-${commentId}' class='far fa-trash-alt comment' style="display:${currentUser().uid === comment.data().idUser ? 'block' : 'none'}" ></i>
        </div>
      </div>  
        `;
  commentLi.innerHTML = commentTemplate;

  const btnDeleteComment = commentLi.querySelector(`#delete-${commentId}`);
  btnDeleteComment.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteComment(postCommentId, commentId, commentLi);
  });

  if (comment.data().photo) {
    (commentLi.querySelector('.imgUserComment')).src = comment.data().photo;
  }

  containerComment.append(commentLi);
};

const commentsPost = (idPost, containerComment) => {
  getComments(idPost).then((snapshot) => {
    snapshot.forEach((comment) => {
      printComment(comment, containerComment);
    });
  });
};

const savePostSelected = (idUser, idPost) => {
  const postSave = {
    idPost,
  };
  savePost(idUser, idPost, postSave);
};

export {
  deletePost, sendLike, displayComments, commentsPost, printComment, savePostSelected,
};
