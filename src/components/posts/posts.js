/* eslint-disable no-loop-func */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-syntax */
import { updatePost, currentUser, createComment,  } from '../../services/index.js';
import { /*dateFormat,*/ deletePost, sendLike, displayComments, commentsPost, savePostSelected,  } from './postfunctions.js';

const Post = (photoPost, nameUserPost, text, idUserPost, idPost, dateP, likesPost) => {

  const element = document.createElement('li');
  const template = `
    <article data-post class='postContainer' id=${idUserPost}>
    <header class='post-header' id=${idPost}> 
      <section class='userInfo'>               
        <img id='photoPost-${idPost}' class='imageCirclePostUser' src='${photoPost}' height="40px" width="40px">
        <p class='username'>${nameUserPost}</p>       
      </section>
      <section class='sectionSaveDate'>
      <time datetime='${dateP}' id='postDate' class='postDate'>${dateP}</time>
      <i data-saveAnchorPost='${idPost}'  type='button' id='${idPost}' class="fas fa-anchor"></i>
                 
      </section>
    </header> 
    <form class='formContainer'>
      <textarea data-textPost='${idPost}' id='textarea-${idPost}' class='postInput' disabled>${text}</textarea>      
      <section id='section' class='postBtnContainer'>
        <button type='button' data-comments='${idPost}' id='comment-${idPost}' class='commentBtn'>Comentários</button>
        
        <div data-editBtns='${idPost}' id='edition-btns' class='edition-btns'>
          <i data-saveEdit='${idPost}' id='save-${idPost}' class='far fa-check-square'></i> 
          <i data-cancelEdit='${idPost}' type='button' id='cancel-${idPost}' class='far fa-window-close'></i>
        </div>
        <i data-edit='${idPost}' type='button' id='edit-${idPost}' class='far fa-edit' style="display:${currentUser().uid === idUserPost ? 'block' : 'none'}" ></i>
          
        <i data-delete='${idPost}' type='button'  id='delete-${idPost}' class='far fa-trash-alt' style="display:${currentUser().uid === idUserPost ? 'block' : 'none'}" ></i>

        <a data-num='${idPost}' id='numLike-${idPost}' class='numLikes'>${likesPost.length}</a>
        <i data-like='${idPost}' id='like-${idPost}' class='far fa-heart'></i>      
      </section>  
      <section data-showcomments='${idPost}' id='showcomments-${idPost}' class='showcomments'>
        <div class="commentsinput-container">
          <textarea data-commentInput='${idPost}' class='commentInput' type='text' placeholder='escreva a sua mensagem'></textarea>
          <button type='button' data-send='${idPost}' class='sendComment'>Publicar</button>
        </div>
        <ul data-listcomments='${idPost}' class='comments-list'>
          
        </ul>        
      </section>  
    </form>
    </article> 
  `;

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


  const btnLike = postElement.querySelector(`#like-${idPost}`);
  if (likesPost.includes(idUser)) {
    btnLike.classList.add('fas');
  } else {
    btnLike.classList.add('far');
  }

  const listOfPosts = postElement.querySelector('[data-post]');
  listOfPosts.addEventListener('click', (e) => {
    const { target } = e;

    const postSaveBtn = postElement.querySelector(`[data-saveAnchorPost='${idPost}']`);
    console.log(postSaveBtn);
    const postSaveButton = target.dataset.saveanchorpost;
    console.log(postSaveButton);

    if (postSaveBtn === target) {      
      savePostSelected(idUser, postSaveButton);
    }

    const postSelectDelete = (postElement.querySelector('[data-delete]')).parentNode.parentNode.parentNode.parentNode;
    const deleteButton = target.dataset.delete;
    if (deleteButton) {
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

    //Botão Comentários, aparecerá a section
    const commentsIdPost = target.dataset.comments;
    const commentUl = postElement.querySelector('[data-listcomments]');

    if (commentsIdPost) {
      displayComments(`showcomments-${idPost}`);
      commentsPost(commentsIdPost, commentUl); // não consegui unir as funções, há um erro no then, mas nao entendo pq
    }

    //Botão Publicar comentário
    const sendComment = target.dataset.send;

    if (sendComment) {
      const commentText = postElement.querySelector('[data-commentInput]');
      if (!commentText.value) {
        alert('Escreva a sua mensagem');
      } else if (!user.displayName) {
        alert('Atualize o seu cadastro');
      } else {
        const dateComment = new Date();
        //  const commentId = dateComment.replaceAll(/[/: ]/g, '');

        const commentObj = {
          idUser,
          idPost,
          name: user.displayName,
          photo: user.photoURL,
          text: commentText.value,
          date: dateComment.toLocaleString('pt-BR'),
          //idComment: commentObj.date.replaceAll(/[/: ]/g, ''),
        };
        console.log(commentObj);

        commentText.value = '';

        //cria o comentário com a função do services
        createComment(commentObj.idPost, commentObj);

            //atualiza a section dos comentários
            commentUl.innerHTML = '';
            commentsPost(commentObj.idPost, commentUl, postElement);
          }          
    }
    });

  return timeline2;
}

export { printPost };
