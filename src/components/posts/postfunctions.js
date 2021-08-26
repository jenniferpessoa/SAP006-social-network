/* eslint-disable spaced-comment */
import {
  getComments, deletePostFeed, likePost, getLikes, unlikePost, currentUser,
} from '../../services/index.js';

const deletePost = (idPost, post) => {
  const root = document.querySelector('.root');
  const popupContainer = document.createElement('div');
  popupContainer.innerHTML = ` 
      <div class='popup-wrapper'>
        <div class='popup'>
          <div class='popup-content'>
            <div id='yes' class='yes'>SIM</div>
            <div id='no' class='não'>NAO</div>
          </div>                
        </div>
      </div>
    `;
  root.appendChild(popupContainer);

  const popup = root.querySelector('.popup-wrapper');
  const popUpContent = root.querySelector('.popup-content');

  function exibeModal() {
    popup.style.display = 'block';
  }
  exibeModal();

  popUpContent.addEventListener('click', (event) => {
    const answerUser = event.target.id;

    if (answerUser === 'yes') {
      deletePostFeed(idPost).then(post.remove());
      popup.style.display = 'none';
    } else {
      popup.style.display = 'none';
    }
  });
  return root;
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

const commentsPost = (idPost, container) => {
  getComments(idPost).then((snapshot) => {
    const commentsArray = snapshot.data().comments;
    console.log(snapshot.data().comments);
 

    commentsArray.forEach((comment) => {
      const commentLi = document.createElement('li');
      commentLi.classList.add('comment-main-level');
      const commentTemplate = `
            <div class='comment-avatar'><img src='../../img/profileImg.png' class='imgComment' alt=''></div>

            <div class="comment-box">
              <div class="comment-head">
                <h6 class="comment-name by-author">${comment.name}</h6>
                <span>${comment.date}</span>
                </div>
              <div class="comment-content">${comment.text}</div>            
            </div>
           `;
      commentLi.innerHTML = commentTemplate;

      const picturePost = commentLi.querySelector('.imgComment');

      if (comment.photo) {
        picturePost.src = comment.photo;
      }
      container.prepend(commentLi);
    });
  });
};

export { deletePost, sendLike, commentsPost };
