// import { signOut } from "../../services/index.js";
import { createPost, getLikes, currentUser } from '../../services/index.js';
import { printPost, loadPost } from '../../components/posts/posts.js';
import { headerMenu } from '../../components/header/index.js';
import { AsideFeed } from '../../components/aside-elements/index-aside.js';

export const Feed = () => {
  const root = document.createElement('main');
  root.classList.add('main');
  root.style.display = 'flex';

  // cria a publicação do usuário
  const user = currentUser();
  const idUser = user.uid;
  const name = user.displayName;
  const photo = user.photoURL;
  const email = user.email;
  const date = new Date();

  headerMenu();

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
    <section class="search-result"></section>  
    <ul data-feedTimeline='feedTimeline' class='feedTimeline'></ul>
  `;
  root.appendChild(feedContainer);

  const searchContainer = root.querySelector('.search-result');
  const timeline = root.querySelector('.feedTimeline');
  
  AsideFeed(root, idUser, name, email, photo, searchContainer, timeline);

  const textInput = root.querySelector('.postPublishInput');
  const btnPublish = root.querySelector('.publishBtn');

  // publica criando o objeto no post-firestore
  btnPublish.addEventListener('click', () => {
    if (!textInput.value) {
      alert('Escreva a sua mensagem!');
    } else if (!name) {
      alert('Atualize o seu cadastro');
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
        keywords: (textInput.value).toLowerCase().split(' '),
      };

      createPost(postObj).then((doc) => {
        getLikes(doc.id).then((post) => {
          const postPosted = printPost(post);
          timeline.prepend(postPosted);
        });
      });
      textInput.value = '';
    }
  });

  loadPost();
  return root;
};
