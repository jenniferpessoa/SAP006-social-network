import {
  navigation,
} from '../../router.js';

export const Conecte = () => {
  const template = `
    <figure class="onboard-header">
      <img src="../../img/onboard2.png" class="onboard-img" alt="Imagem de um veleiro">
      <div class="custom-shape-divider-bottom-1629923973">
        <svg viewBox="0 0 1825 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="rgba(255, 255, 255, 1)" d="M 0 200 C 181 200 181 74 362 74 L 362 74 L 362 0 L 0 0 Z" stroke-width="0"></path> <path fill="rgba(255, 255, 255, 1)" d="M 361 74 C 583.5 74 583.5 159 806 159 L 806 159 L 806 0 L 361 0 Z" stroke-width="0"></path> <path fill="rgba(255, 255, 255, 1)" d="M 805 159 C 1031.5 159 1031.5 51 1258 51 L 1258 51 L 1258 0 L 805 0 Z" stroke-width="0"></path><path fill="rgba(255, 255, 255, 1)" d="M 1257 51 C 1549 51 1549 200 1841 200 L 1841 200 L 1841 0 L 1257 0 Z" stroke-width="0"></path></svg>
    <!-- <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
        </svg> -->
      </div>
    </figure>

    <section class="content">
      <header class="content-title">
      Compartilhe<br>
      suas experiências...
      </header>

      <main class="content-paragraph">
        <p>Bombordo é uma rede social </p> 
      </main>

      <section class="section-continue-button">
        <button data-continue id="btn-continue" class="btn-continue">Continuar</button>
      </section>

      <section class="section-skip-button">
        <button class="btn-skip">Pular</button>
      </section>
    </section>
  `;

  const rootElement = document.createElement('div');
  rootElement.setAttribute('class', 'conecte-container');
  rootElement.innerHTML = template;

  const continueBtn = rootElement.querySelector('#btn-continue');
  continueBtn.addEventListener('click', (event) => {
    event.preventDefault();
    navigation('/comunique');
  });

  // const skipBtn = rootElement.querySelector('.btn-skip')
  // skipBtn.addEventListener('click', (event) => {
  //   event.preventDefault()
  //   navigation('/login')
  // });

  return rootElement;
};
