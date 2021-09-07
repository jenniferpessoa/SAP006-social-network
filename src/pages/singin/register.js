import { signUpWithEmailAndPassword, loginWithGmail } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';
import { getError } from '../../Errors/index.js';

export const SignUp = () => {
  const root = document.createElement('div');
  root.innerHTML = `
  <header class='logo'>
    <h1>A Bordo</h1>
    <h2>A Rede Social dos Velejadores</h2>
  </header>
  <main id='loginPage' class='container'>
    <section class='img-container'></section>    
    <section id='login' class='login-container'>
      <header class='form-options'>
        <span class='opt-login'>Login</span>
        <span class='opt-signup linkSignUp'>Cadastro</span>
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
          <button type='button' id='signUpButton' class='btn-signup btn form-item'>Cadastrar</button>
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

  const btnLogin = root.querySelector('.opt-login');
  const btnSignUp = root.querySelector('#signUpButton');
  const btnGoogle = root.querySelector('#btnGmail');
  const inputEmail = root.querySelector('#email');
  const inputPassword = root.querySelector('#password');

  btnLogin.addEventListener('click', () => {
    navigation('/');
  });

  btnSignUp.addEventListener('click', () => {
    signUpWithEmailAndPassword(inputEmail.value, inputPassword.value)
      .then(() => {
        navigation('/profile');
      })
      .catch((error) => {
        getError(error);
      });
  });

  btnGoogle.addEventListener('click', () => {
    loginWithGmail();
  });

  return root;
};
