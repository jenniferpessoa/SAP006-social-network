/* eslint-disable no-alert */
import { getError } from '../../Errors/index.js';
import { navigation } from '../../routes/navigation.js';
import { resetPassword } from '../../services/index.js';

export const Reset = () => {
  const root = document.createElement('div');
  root.innerHTML = `
  <header class='logo'>
    <h1>A Bordo</h1>
    <h2>A Rede Social dos Velejadores</h2>
  </header>
  <main class='container'>  
    <section class='img-container'>
    </section>    
    <section id='login' class='login-container'>
      <header class='reset-text'>
        Redefinir Senha
      </header>
      <section class='form-container'>
        <form>
          <div class='form-fields'>
            <label for='email'>E-mail</label>
            <input id='email' type='e-mail' class='input-item'>
              
            <button type='button' id='buttonReset' class='btn-login btn form-item'>Enviar</button>

            <button type='button' id='buttonReturn' class='btn-login btn form-item'>Voltar</button>
          </div>  
        </form>
      </section>
    </section>
  </main>
  `;

  const btnReset = root.querySelector('#buttonReset');
  const btnReturn = root.querySelector('#buttonReturn');
  const inputEmail = root.querySelector('#email');

  btnReset.addEventListener('click', () => {
    resetPassword(inputEmail.value).then(() => {
      alert('E-mail enviado com sucesso! Confira sua caixa de entrada');
    }).catch((error) => {
      getError(error);
    });
  });

  btnReturn.addEventListener('click', () => {
    navigation('/');
  });

  return root;
};
