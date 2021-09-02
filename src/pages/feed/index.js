// import { signOut } from "../../services/index.js";
import { createPost, getPost, currentUser } from '../../services/index.js';
import { printPost } from '../../components/posts/posts.js';
import { headerMenu } from '../../components/header/index.js';
import { profileFeed } from '../../components/profile-feed/profile-feed.js';

function loadPost() {
  getPost().then((snapshot) => {
    snapshot.forEach((post) => {
      printPost(post);
    });
  });
}

export const Feed = () => {
  const root = document.createElement('main');
  root.classList.add('main');
  root.style.display = 'flex';
  //root.style.alignItems = 'flex-start';
  headerMenu();

  //cria a publicação do usuário 
  const user = currentUser();
  const idUser = user.uid;
  const name = user.displayName;
  const photo = user.photoURL;
  const email = user.email;
  const date = new Date();

  profileFeed(root, idUser, name, email, photo);

  const feedContainer = document.createElement('div');
  feedContainer.classList.add('feed-container');
  feedContainer.innerHTML = `  
    <div class='publishContainer'>
      <form class='formPublishContainer'>
        <textarea class='postPublishInput' type='text' placeholder='faça o seu Aviso aos Navegantes'></textarea>      
        <section class='publishBtnContainer'>
          <button type='button' class='publishBtn'>Publicar</button>
        </section>  
      </form>     
    </div>  
    <ul data-feedTimeline='feedTimeline' class='feedTimeline'></ul>
  `;
  root.appendChild(feedContainer);

  const textInput = root.querySelector('.postPublishInput');
  const btnPublish = root.querySelector('.publishBtn');



  //publica criando o objeto no post-firestore
  btnPublish.addEventListener('click', () => {
    if (!textInput.value) {
      alert('Escreva a sua mensagem!');
    } else {
      const postObj = {
        idUser,
        idPost: '',
        name,
        photo,
        text: textInput.value,
        date,
        dateP: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        likes: [],
        comments: [],
      };
      console.log(postObj);
      createPost(postObj);

      const timeline = root.querySelector('.feedTimeline');
      timeline.innerHTML = '';
      textInput.value = '';
      loadPost();
    }
  });

  loadPost();
  return root;
};
