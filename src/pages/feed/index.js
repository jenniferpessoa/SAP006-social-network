// import { signOut } from "../../services/index.js";
import { createPost, getPost, currentUser } from '../../services/index.js';
import { printPost } from '../../components/posts/posts.js';
import { headerMenuFeed } from '../../components/header/menuFeed.js';

function loadPost() {
  getPost().then((snapshot) => {
    snapshot.forEach((post) => {
      printPost(post);
    });
  });
}

export const Feed = () => {
  // chama os outros elementos do html
  headerMenuFeed();
  // cria a publicação do usuário
  const user = currentUser();
  const idUser = user.uid;
  const name = user.displayName;
  const photo = user.photoURL;
  const date = new Date();
  const root = document.createElement('main');
  root.classList.add('feed-container');
  root.innerHTML = `  
    <main class='postContainer'>
      <header id='postHeader' class='post-header'>
      <section class='userInfo'>
        <img src='../../img/profileImg.png' id='pictureUser' class='imageCirclePostUser' height="40px" width="40px">
        <p class='username'>${name}</p> 
      </section>      
      </header> 
      <form class='formContainer'>
        <textarea class='postInput' type='text' placeholder='Sua Mensagem'></textarea>      
        <section class='postBtnContainer'>
          <button type='button' class='publishBtn'>Publicar</button>
        </section>  
      </form>     
    <section class='feedTimeline'></section>
    </main>  
  `;

  const textInput = root.querySelector('.postInput');
  const btnPublish = root.querySelector('.publishBtn');
  const picturePost = root.querySelector('#pictureUser');
  // insere a foto
  if (photo) {
    picturePost.src = photo;
  }
  // confere o nome
  if (!name) {
    root.querySelector('.username').innerText = 'User';
  }

  // publica criando o objeto no post-firestore
  btnPublish.addEventListener('click', () => {
    const postObj = {
      idUser,
      idPost: '',
      name,
      photo,
      text: textInput.value,
      date: date.toLocaleString('pt-BR'),
      dateP: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      likes: [],
      comments: [],
    };
    console.log(postObj);
    createPost(postObj);

    const timeline = document.querySelector('.feedTimeline');
    timeline.innerHTML = '';
    textInput.value = '';
    loadPost();
  });

  loadPost();
  return root;
};
