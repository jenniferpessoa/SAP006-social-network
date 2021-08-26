/* eslint-disable no-loop-func */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-syntax */
import { createComment, updatePost, currentUser } from '../../services/index.js';
import { deletePost, sendLike, commentsPost } from './postfunctions.js';

const Post = (photoPost, nameUserPost, text, idUserPost, idPost, dateP, likesPost) => {
  const element = document.createElement('div');
  const template = `
  <main class='postContainer' data-post='${idPost}' id='${idUserPost}'>
    <header class='post-header' id='${idPost}'>      
      <section class='userInfo'>
        <img id='photoPost-${idPost}' class='imageCirclePostUser' src='${photoPost}' height="40px" width="40px">
        <p class='username'>${nameUserPost}</p> 
      </section>
      <p id='postDate' class='postDate'>${dateP}</p> 
    </header> 
    <form class='formContainer'>
      <textarea data-textPost='${idPost}' id='${idPost}' class='postInput' placeholder='Sua Mensagem' disabled>${text}</textarea>      
      
      <section id='section' class='postBtnContainer'>
        <button type='button' data-comments='${idPost}' id='comment-${idPost}' class='commentBtn'>Comments</button>
        
        <button data-edit='${idPost}' type='button' id='edit-${idPost}' class='editBtn'>Edit</button>
          <ul data-btnsEd='${idPost}' id='edition-btns' class='edition-btns'>
             <li data-saveEdit='${idPost}' type='button' id='save-${idPost}' class='saveEditBtn'>Save</li> 
             <li data-cancelEdit='${idPost}' type='button' id='cancel-${idPost}' class='cancelEditBtn'>Cancel</li>
          </ul>

        <button type='button' data-delete='${idPost}' id='delete-${idPost}' class='deleteBtn'>Delete</button>

        <a data-num='${idPost}' id='numLike-${idPost}' class='numLikes'>${likesPost.length}</a>
        <i data-like='${idPost}' id='like-${idPost}' class='far fa-heart'></i>
      </section> 
      
      <section data-showcomments='${idPost}' id='showcomments-${idPost}' class='showcomments'>
        <div class="comments-container">
          <p class='username'></p> 
          <textarea data-commentInput='${idPost}' class='commentInput' type='text' placeholder='Sua Mensagem'></textarea>      
          <button type='button' data-send='${idPost}'>Publicar</button>
          <ul data-listcomments='${idPost}' class='comments-list'>
          
          </ul>
        </div>  
      </section>  
    </form>      
  </main>
  `;
  element.innerHTML = template;
  return element;
};

function printPost(post) {
  const user = currentUser();
  const idUser = user.uid;
  const date = new Date();
  const idPost = post.id;
  const text = post.data().text;
  const idUserPost = post.data().idUser;
  const nameUserPost = post.data().name;
  const photoPost = post.data().photo;
  const dateP = post.data().dateP;
  const likesPost = post.data().likes;

  const timeline2 = document.querySelector('[data-feedTimeline]');

  const postElement = Post(photoPost, nameUserPost, text, idUserPost, idPost, dateP, likesPost);
  timeline2.appendChild(postElement);

  const listOfPosts = postElement.querySelector('[data-post]');
  const btnLike = postElement.querySelector(`#like-${idPost}`);
  //const numberOfLikes = postElement.querySelector(`#numLike-${idPost}`);
  const btnEdit = postElement.querySelector(`#edit-${idPost}`);
  const btnDelete = postElement.querySelector(`#delete-${idPost}`);

  if (idUser === idUserPost) {
    btnEdit.style.display = 'block';
    btnDelete.style.display = 'block';
  }

  if (likesPost.includes(idUser)) {
    btnLike.classList.add('fas');
  } else {
    btnLike.classList.add('far');
  }

  //(commentPublish == target)
  listOfPosts.addEventListener('click', (e) => {
    const { target } = e;

    //Botão Comentários, aparecerá a section 
    const commentsIdPost = target.dataset.comments;
    const commentUl = postElement.querySelector('[data-listcomments]');
    const commentsShow = postElement.querySelector('[data-comments]');

    if (commentsShow) {
      postElement.querySelector('[data-showcomments]').style.display = 'block';
      /*commentUl.innerHTML = '';*/
      commentsPost(commentsIdPost, commentUl);
    }

    //Botão Publicar comentário 
    const sendComment = target.dataset.send;
    const sectionCommentId = target.parentNode.parentNode.parentNode.parentNode.children[0].id;

    if (sendComment === sectionCommentId) {
      const commentText = postElement.querySelector('[data-commentInput]');
      
      const commentObj = {
        idUser,
        idPost,
        name: user.displayName,
        photo: user.photoURL,
        text: commentText.value,
        date: date.toLocaleString('pt-BR'),
      };
      console.log(commentObj.idPost);

      //cria o comentário com a função do services 
      createComment(commentObj.idPost, commentObj);

      //atualiza a section dos comentários 
      commentUl.innerHTML = '';
      commentsPost(commentObj.idPost, commentUl);
      console.log(commentUl);
    }



    //Parte das funções do Post Deletar, curtir, Editar
    const postSelectDelete = (postElement.querySelector('[data-delete]')).parentNode.parentNode.parentNode; //está bugada, pedir ajuda da Mari
    const deleteButton = postElement.querySelector('[data-delete]');
    if (deleteButton === target) {
      deletePost(idPost, postSelectDelete);
    }

    const likeIdPost = target.dataset.like;
    const likeIcon = postElement.querySelector('[data-like]');
    const numLikes = postElement.querySelector('[data-num]');
    if (likeIcon === target) {
      sendLike(idUser, likeIdPost, numLikes, likeIcon);
    }

    const editButton = target.dataset.edit;
    const editTextarea = postElement.querySelector('[data-textPost]');
    const editionBtns = document.querySelector('[data-edit]');

    const saveEditButton = postElement.querySelector('[data-saveEdit]');
    const cancelEditButton = postElement.querySelector('[data-cancelEdit]');

    if (editButton) {
      editionBtns.style.display = 'none';
      saveEditButton.style.display = 'block';
      cancelEditButton.style.display = 'block';
      postElement.querySelector('[data-btnsEd]').style.display = 'block';
      editTextarea.removeAttribute('disabled');
      editTextarea.focus();
    }

    if (saveEditButton === target) {
      const saveTextarea = postElement.querySelector('[data-textPost]').value;
      console.log(saveTextarea);
      updatePost(idPost, saveTextarea);

      editionBtns.style.display = 'block';
      postElement.querySelector('[data-btnsEd]').style.display = 'none';
    }

    if (cancelEditButton === target) {
      editTextarea.setAttribute('disabled', '');

      editionBtns.style.display = 'block';
      postElement.querySelector('[data-btnsEd]').style.display = 'none';
    }
  });
  return timeline2;
}

export { printPost };

