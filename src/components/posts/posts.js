/* eslint-disable no-loop-func */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-syntax */
import { updatePost, currentUser } from '../../services/index.js';
//import { Feed } from '../../pages/feed/index.js';
import { deletePost, sendLike } from './postfunctions.js';

const Post = (photoPost, nameUserPost, text, idUserPost, idPost, dateP, likesPost) => {
  const template = `
  <main class='postContainer' data-post id=${idUserPost}>
    <header class='post-header' id=${idPost}>      
      <section class='userInfo'>
        <img id='photoPost-${idPost}' class='imageCirclePostUser' src='${photoPost}' height="40px" width="40px">
        <p class='username'>${nameUserPost}</p> 
      </section>
      <p id='postDate' class='postDate'>${dateP}</p> 
    </header> 
    <form class='formContainer'>
      <textarea id='textarea-${idPost}' class='postInput' placeholder='Sua Mensagem' disabled>${text}</textarea>      
      <section id='section' class='postBtnContainer'>
        <div id='edition-btns' class='edition-btns'>
          <i data-save='save' type='button' id='save-${idPost}' class='far fa-check-square'></i> 
          <i data-cancel='cancel' type='button' id='cancel-${idPost}' class='far fa-window-close'></i>
        </div>
        <a data-num='num' id='numLike-${idPost}' class='numLikes'>${likesPost.length}</a>
        <i data-like='like' id='like-${idPost}' class='far fa-heart'></i>
        <i data-edit='edit' type='button' id='edit-${idPost}' class='far fa-edit'></i>
        <button type='button' data-delete='delete' id='delete-${idPost}' class='deleteBtn'>Delete</button>
      </section>  
    </form>    
  </main>
  `;
  return template;
};

function printPost(post) {
  const user = currentUser();
  const idUser = user.uid;

  const idPost = post.id;
  const text = post.data().text;
  const idUserPost = post.data().idUser;
  const nameUserPost = post.data().name;
  const photoPost = post.data().photo;
  // const datePost = post.data().date;
  const dateP = post.data().dateP;
  const likesPost = post.data().likes;

  // const updateId = {
  //   idPost: post.id,
  // };
  // updatePost(updateId, post.id);
  // console.log(updateId);

  firebase.firestore().collection('post').doc(post.id).update({
    idPost: post.id,
  });

  const timeline2 = document.querySelector('.feedTimeline');
  timeline2.innerHTML += '';
  // eslint-disable-next-line max-len
  timeline2.innerHTML += Post(photoPost, nameUserPost, text, idUserPost, idPost, dateP, likesPost);

  // const picturePost = document.querySelector(`#photoPost-${idPost}`);
  // picturePost.src = photoPost;

  const postSelected = document.querySelectorAll('[data-post]');
  const btnLike = document.querySelector(`#like-${idPost}`);
  const numberOfLikes = document.querySelector(`#numLike-${idPost}`);
  const btnEdit = document.querySelector(`#edit-${idPost}`);
  const btnSaveEdit = document.querySelector(`#save-${idPost}`);
  const btnCancelEdit = document.querySelector(`#cancel-${idPost}`);
  const btnDelete = document.querySelector(`#delete-${idPost}`);

  if (idUser === idUserPost) {
    btnLike.style.display = 'none';
    numberOfLikes.style.display = 'none';
    btnEdit.style.display = 'block';
    btnDelete.style.display = 'block';
  } else {
    btnSaveEdit.style.display = 'none';
    btnCancelEdit.style.display = 'none';
    btnEdit.style.display = 'none';
  }

  if (likesPost.includes(idUser)) {
    btnLike.classList.add('fas');
  } else {
    btnLike.classList.add('far');
  }

  for (const partOfPost of postSelected) {
    partOfPost.addEventListener('click', (event) => {
      const e = event.target;
      const mainPost = (document.querySelector(`#${event.target.id}`)).parentNode.parentNode.parentNode;

      const idCreatorPost = (document.querySelector(`#${event.target.id}`)).parentNode.parentNode.parentNode.getAttribute('id');
      const idPostClicked = (document.querySelector(`#${event.target.id}`)).parentNode.parentNode.parentNode.children[0].getAttribute('id');
      //const deleteBtn = (event.target.id).includes('delete');
      const likeIcon = document.querySelector(`#${event.target.id}`);
      const numLikes = document.querySelector(`#${event.target.id}`).previousElementSibling;

      if (e.dataset.delete && idCreatorPost === idUser) {
        deletePost(idPostClicked, mainPost);
      }

      if (e.dataset.like) {
        sendLike(idUser, idPostClicked, numLikes, likeIcon);
      }

      if (e.dataset.edit && idCreatorPost === idUser) {
        const editTextarea = (document.querySelector(`#${event.target.id}`)).parentNode.previousElementSibling;
        const editionBtns = document.querySelector(`#${event.target.id}`).previousElementSibling.previousElementSibling.previousElementSibling;
        editionBtns.style.display = 'block';
        editTextarea.removeAttribute('disabled');
        editTextarea.focus();
      }

      if (e.dataset.save) {
        const saveTextarea = document.querySelector(`#${event.target.id}`).parentNode.parentNode.previousElementSibling.value;
        const editionBtns = document.querySelector(`#${event.target.id}`).parentNode;
        const postId = (document.querySelector(`#${event.target.id}`)).parentNode.parentNode.parentNode.parentNode.children[0].getAttribute('id');
        editionBtns.style.display = 'none';
        updatePost(postId, saveTextarea);
      }

      if (e.dataset.cancel) {
        const editTextarea = (document.querySelector(`#${event.target.id}`)).parentNode.parentNode.previousSibling.previousSibling;
        editTextarea.setAttribute('disabled', '');
        const editionBtns = document.querySelector(`#${event.target.id}`).parentNode;
        editionBtns.style.display = 'none';
        //console.log(editTextarea, 'cancela mesmo <3');
      }
    });
  }
  return timeline2;
}

export { printPost };
