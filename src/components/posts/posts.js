/* eslint-disable no-loop-func */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-syntax */
import { updatePost, currentUser } from '../../services/index.js';
import { deletePost, sendLike } from './postfunctions.js';

const Post = (photoPost, nameUserPost, text, idUserPost, idPost, dateP, likesPost) => {
  const element = document.createElement('li');
  const template = `
    <article data-post class='postContainer' id=${idUserPost}>
    <header class='post-header' id=${idPost}> 
      <section class='userInfo'>           
        <img id='photoPost-${idPost}' class='imageCirclePostUser' src='${photoPost}' height="40px" width="40px">
        <p class='username'>${nameUserPost}</p>       
      </section>
      <time datetime='${dateP}' id='postDate' class='postDate'>${dateP}</time> 
    </header> 
    <form class='formContainer'>
      <textarea data-textPost='${idPost}' id='textarea-${idPost}' class='postInput' disabled>${text}</textarea>      
      <section id='section' class='postBtnContainer'>
        <div data-editBtns='${idPost}' id='edition-btns' class='edition-btns'>
          <i data-saveEdit='${idPost}' id='save-${idPost}' class='far fa-check-square'></i> 
          <i data-cancelEdit='${idPost}' type='button' id='cancel-${idPost}' class='far fa-window-close'></i>
        </div>
        <i data-edit='${idPost}' type='button' id='edit-${idPost}' class='far fa-edit'></i>
          
        <i data-delete='${idPost}' type='button'  id='delete-${idPost}' class='far fa-trash-alt'></i>

        <a data-num='${idPost}' id='numLike-${idPost}' class='numLikes'>${likesPost.length}</a>
        <i data-like='${idPost}' id='like-${idPost}' class='far fa-heart'></i>      
      </section>  
    </form>
    </article> 
  `;

  // <section  data-showcomments='${idPost}' id='showcomments-${idPost}' class='showcomments'>
  //     <div class="comment-container">
  //       <textarea data-commentInput='${idPost}' class='commentInput' type='text' placeholder='Sua Mensagem'></textarea>
  //       <label for="form7">Send your comment</label>      
  //       <button type='button' data-send='${idPost}' class='sendComment'>Publicar</button>
  //     </div>
  //     <ul data-listcomments='${idPost}' class='comments-list'>  

  //     </ul>
  //   </section>

  element.innerHTML = template;
  return element;
};

function printPost(post) {
  const user = currentUser();
  const idUser = user.uid;
  const date = post.data().date;
  const idPost = post.id;
  const text = post.data().text;
  const idUserPost = post.data().idUser;
  const nameUserPost = post.data().name;
  const photoPost = post.data().photo;
  const dateP = post.data().dateP;
  const likesPost = post.data().likes;

  const timeline2 = document.querySelector('[data-feedTimeline]');
  const postElement = Post(photoPost, nameUserPost, text, idUserPost, idPost, dateP, likesPost);
  timeline2.append(postElement);

  const listOfPosts = postElement.querySelector('[data-post]');

  const btnLike = postElement.querySelector(`#like-${idPost}`);
  const btnEdit = postElement.querySelector(`#edit-${idPost}`);
  const btnDelete = postElement.querySelector(`#delete-${idPost}`);

  if (idUser === idUserPost) {
    btnEdit.style.display = 'block';
    btnDelete.style.display = 'block';
  } else {
    btnEdit.style.display = 'none';
    btnDelete.style.display = 'none';
  }

  if (likesPost.includes(idUser)) {
    btnLike.classList.add('fas');
  } else {
    btnLike.classList.add('far');
  }

  listOfPosts.addEventListener('click', (e) => {
    const { target } = e;

    const postSelectDelete = (postElement.querySelector('[data-delete]')).parentNode.parentNode.parentNode.parentNode; //está bugada, pedir ajuda da Mari
    const deleteButton = target.dataset.delete;
    if (deleteButton) {
      console.log(postSelectDelete);
      deletePost(deleteButton, postSelectDelete);
    }

    const likeIdPost = target.dataset.like;
    const likeIcon = postElement.querySelector('[data-like]');
    const numLikes = postElement.querySelector('[data-num]');
    if (likeIcon === target) {
      sendLike(idUser, likeIdPost, numLikes, likeIcon);
    }

    const editButton = target.dataset.edit;
    const editBtn = postElement.querySelector('[data-edit]');

    const editTextarea = postElement.querySelector('[data-textPost]');

    const editionBtns = postElement.querySelector('[data-editBtns]');
    const saveEditButton = postElement.querySelector('[data-saveEdit]');
    const cancelEditButton = postElement.querySelector('[data-cancelEdit]');

    if (editButton) {
      editionBtns.style.display = 'block';
      editBtn.style.display = 'none';
      editTextarea.removeAttribute('disabled');
      editTextarea.focus();
    }

    if (saveEditButton === target) {
      const saveTextarea = postElement.querySelector('[data-textPost]').value;
      if (!saveTextarea) {
        alert('Escreva a sua mensagem!');
        editTextarea.value = text;
      } else {
        updatePost(idPost, saveTextarea);
        editTextarea.setAttribute('disabled', '');
        editionBtns.style.display = 'none';
        editBtn.style.display = 'block';
      }
    }

    if (cancelEditButton === target) {
      editTextarea.setAttribute('disabled', '');
      editTextarea.value = text;
      editionBtns.style.display = 'none';
      editBtn.style.display = 'block';
    }
  });
  return timeline2;
}

export { printPost };
