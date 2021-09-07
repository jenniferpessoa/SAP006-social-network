import { infoUser, searchPosts, getPostSave, getLikes } from '../../services/index.js';
import { weather } from '../weather/index.js';
import { printPost, loadPost } from '../posts/posts.js'

export const AsideFeed = (root, idUser, name, email, photo, searchContainer, timeline) => {
  const rootPf = root;

  const asideContainer = document.createElement('aside');
  asideContainer.classList.add('aside-info');
  asideContainer.innerHTML = `   
  <section class='searchContainer'>
    <section data-search class="search"> 
      <input data-searchText="textsearch" type="text" class="search-input" placeholder="Search..." name="">
      <button  type='button'  class="search-icon">
        <img data-searchbtn="searchbutton" src='img/rudder.png' class="material-icons" height="30px" width="30px">
      </button> 
    </section>
  </section>
  <section class='profile-feed'>
    <div class="profileInfoFeed col-md-3">
      <div class="panel">
        <div class="user-heading round">
          <figure class='feedProfilePicture'>            
            <img class='userPicture' src="profileImg.png" alt="">
          </figure>
          <h1 class='userName'>${name}</h1>
          <p class='userEmail'>${email}</p>
        </div>
        <ul class="userInfoProfileFeed nav-pills nav-stacked">
          <li class="userLocalization"></li>
          <li class="userBoat"></li>
          <li data-viewsavedposts='viewsaved' class="userSave">Salvos<i data-anchorsavedposts='savedposts' type='button' id='savePost' class="fas fa-anchor"></i></li>        
        </ul>
      </div>
    </div>  
  </section>
`;
  weather(asideContainer);
  root.prepend(asideContainer);

  infoUser(idUser).then((snapshot) => {
    if (!snapshot.data().boat || !snapshot.data().localization) {
      root.querySelector('.userBoat').style.display = 'none';
      root.querySelector('.userLocalization').style.display = 'none';
    } else {
      root.querySelector('.userBoat').innerHTML = `Veleiro: ${snapshot.data().boat}`;
      root.querySelector('.userLocalization').innerHTML = `Local: ${snapshot.data().localization}`;
    }
  });

  if (photo) {
    const userPictureProfileFeed = root.querySelector('.userPicture');
    userPictureProfileFeed.src = photo;
  }
  if (!name) {
    rootPf.querySelector('.userName').innerHTML = 'Atualize o seu perfil';
  }




  const asideElements = root.querySelector('.aside-info');
  console.log(asideElements)

  asideElements.addEventListener('click', (event) => {
    const { target } = event;

    const textSearchInput = root.querySelector('[data-searchText]');
    const btnSearch = target.dataset.searchbtn;

    if (target.dataset.searchbtn && textSearchInput.value != "") {
      const textSearch = textSearchInput.value;
      const textSearchArray = textSearch.toLowerCase().split(' ');

      searchContainer.innerHTML = `
        <section class='resultSearchContainer'>
          <span class="searchresult-text">Veja o resultado da navegação por ${textSearch.toUpperCase()}:</span>
          <button data-clearsearchbtn="clearsearch" type='button'  class="btnClearSearch">Limpar a Pesquisa</button>
        </section>
    `;
      timeline.innerHTML = '';
      searchPosts(textSearchArray).then((snapshot) => {
        snapshot.forEach((post) => {
          textSearchInput.value = '';
          const postSearch = printPost(post);
          timeline.prepend(postSearch);
        });
      });

      const btnClearSearch = root.querySelector('[data-clearsearchbtn]');
      btnClearSearch.addEventListener('click', () => {
        searchContainer.innerHTML = '';
        timeline.innerHTML = '';
        loadPost();
      });
    }

    if (target.dataset.viewsavedposts || target.dataset.anchorsavedposts) {
      searchContainer.innerHTML = `
    <section class='resultSearchContainer'>
      <button data-clearsearchbtn="clearsearch" type='button'  class="btnClearSearch">Limpar o resultado da Ancoragem</button>
    </section>
    `;
      timeline.innerHTML = '';
      getPostSave(idUser).then((snapshot) => {
        snapshot.forEach((doc) => {
          getLikes(doc.id).then((post) => {
            const postSaved = printPost(post);
            timeline.prepend(postSaved);
          });
        });
      });
      const btnClearSearch = root.querySelector('[data-clearsearchbtn]');
      btnClearSearch.addEventListener('click', () => {
        searchContainer.innerHTML = '';
        timeline.innerHTML = '';
        loadPost();
      });
    }
  });
  searchContainer.innerHTML = '';
  return root;
};
