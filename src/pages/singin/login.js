import { getError } from '../../Errors/index.js';
import { navigation } from '../../routes/navigation.js';
import { loginEmailAndPassword, loginWithGmail } from '../../services/index.js';

export const Login = () => {
  const root = document.createElement('div');
  root.innerHTML = `
  <header class='logo'>
  <img src="../.././img/logo-start.png"  height="80px" width="350px" alt="">
    <h2>A Rede Social dos Velejadores</h2>
  </header>
  <main class='container'>  
    <section class='img-container'>
    </section>    
    <section id='login' class='login-container'>
      <header class='form-options'>
        <span class='opt-login'>Login</span>
        <span class='opt-signup'>Cadastro</span>
      </header>
      <section class='form-container'>
        <form>
          <div class='form-fields'>
            <label for='email'>E-mail</label>
            <input id='email' type='e-mail' class='input-email form-item'>
              
            <label class='label-login' for='password'>Senha</label>
            <input id='password' type='password' class='input-password form-item'>
          </div>
          <section class='errors'></section>
          <div class='rememberForgot' >
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
    </section>
  </main>
  `;

  const reset = root.querySelector('#reset');
  const btnSignUp = root.querySelector('.opt-signup');
  const btnLogin = root.querySelector('#buttonLogin');
  const btnGmail = root.querySelector('#btnGmail');

  reset.addEventListener('click', (event) => {
    event.preventDefault();
    navigation('/reset');
  });

 // const userName = root.querySelector('.input-email').value;
  // const userEmail = root.querySelector('.input-email').value;
  // const userPassword = root.querySelector('.input-password').value;
  // const validationSignup = rootElement.querySelector('#warning-signup');







  btnSignUp.addEventListener('click', () => navigation('/signup'));

  btnLogin.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorSection = document.querySelector('.errors');

    if (email === '') {
      errorSection.innerHTML = '<p>Digite seu nome</p>';
    } else if (password === '') {
      errorSection.innerHTML = '<p>Digite uma senha</p>';
    }
    loginEmailAndPassword(email, password);
  });

  btnGmail.addEventListener('click', () => {
    loginWithGmail().then(() => {
      navigation('/feed');
    }).catch((error) => {
      getError(error);
    });
  });

  return root;
};
