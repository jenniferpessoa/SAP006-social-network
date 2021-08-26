import { getError } from '../../Errors/index.js';
// eslint-disable-next-line import/no-cycle
import { navigation } from '../../router.js';
import { loginEmailAndPassword, loginWithGmail, keepMeLogged } from '../../services/index.js';

export const Login = () => {
  const root = document.createElement('div');
  root.innerHTML = `
  <header class='logo'>
  <img src='./img/logo-header.png' class='bombordo'></img>
      </header>


  <main class='container'>  

      <header class='form-options'>
        <span class='opt-login'>Login</span>
        <span class='opt-signup'>Cadastro</span>
      </header>
        <section class='form-container'>
        <h4 class="rede">A Rede Social dos Velejadores</h4>
        <form>
           <div class='form-fields'>
            <input id='email' type='e-mail' class='input-email form-item' placeholder="E-mail">
            <input id='password' type='password' class='input-password form-item' placeholder="Senha">
          </div>

          <section class='errors'></section>
          <div class='rememberForgot' >
            <label><input type='checkbox' id='keep-me-logged'> Mantenha-me conectado</label>
            <a href='#' id='reset'>Esqueci a senha</a>
          </div>  

          <button type='button' id='buttonLogin' class='btn-login btn form-item'>Entrar</button>
          <p class='separator'>ou</p>                      
          <button type='button' id='btnGmail' class='btnGmail btn form-item'>
            <img src='./img/logo-google.png' class='google-icon'></img>
            <span>Entrar com o Google</span>
          </button>
        </form>
      </section>
      
  
  </main>
  <footer class="audiobox">
  <div class="wave one"></div>
  <div class="wave two"></div>
 <div class="wave three"></div>
 </footer>
  `;

  const keepLogged = root.querySelector('#keep-me-logged');
  const reset = root.querySelector('#reset');
  const btnSignUp = root.querySelector('.opt-signup');
  const btnLogin = root.querySelector('#buttonLogin');
  const btnGmail = root.querySelector('#btnGmail');

  keepLogged.addEventListener('change', () => {
    const local = firebase.auth.Auth.Persistence.LOCAL;
    const none = firebase.auth.Auth.Persistence.NONE;
    if (keepLogged.checked === true && btnLogin) {
      keepMeLogged(local);
    } else if (keepLogged.checked === true && btnGmail) {
      keepMeLogged(local);
    }
    keepMeLogged(none);
  });

  reset.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.replace('/reset');
  });

  btnSignUp.addEventListener('click', () => { // Aqui não podemos chamar a navigation?
    window.history.pushState({}, '', '/signup');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });

  btnLogin.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    loginEmailAndPassword(email, password)
      .then(() => {
        navigation('/feed');
      })
      .catch((error) => {
        getError(error);
      });
  });

  btnGmail.addEventListener('click', () => {
    loginWithGmail();
  });

  return root;
};
