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
  headerMenu();
  profileFeed();

  //cria a publicação do usuário 
  const user = currentUser();
  const idUser = user.uid;
  const name = user.displayName;
  const photo = user.photoURL;
  const date = new Date();

  const root = document.createElement('div');
  root.classList.add('feed-container');
  root.innerHTML = `  
    <div class='publishContainer'>
      <header id='postHeader' class='post-header'>   
        <p class='username'>${name}</p>          
      </header> 
      <form class='formContainer'>
        <textarea class='postInput' type='text' placeholder='Sua Mensagem'></textarea>      
        <section class='postBtnContainer'>
          <button type='button' class='publishBtn'>Publicar</button>
        </section>  
      </form>     
    </div>  
    <ul data-feedTimeline='feedTimeline' class='feedTimeline'></ul>
  `; 
  
  const textInput = root.querySelector('.postInput');
  const btnPublish = root.querySelector('.publishBtn');

  if (!name) {
    root.querySelector('.username').innerText = 'User';
  }

  //publica criando o objeto no post-firestore
  btnPublish.addEventListener('click', () => {
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
  });

  loadPost();
  return root;
};
