const popUpNotice = (template) => {
  const root = document.querySelector('.root');

  const popupContainer = document.createElement('div');
  popupContainer.innerHTML = ` 
      <div class='popup-wrapper'>
          <div class='popup'>
            <div class='popup-close'> x </div>
            <div class='popup-content'></div>      
          </div>
        </div>
    `;
  root.appendChild(popupContainer);

  const popup = root.querySelector('.popup-wrapper');
  const popUpContent = root.querySelector('.popup-content');

  function exibeModal() {
    popup.style.display = 'block';
    popUpContent.innerHTML = template;
  }
  exibeModal();

  popup.addEventListener('click', (event) => {
    const classNameOfClickedElement = event.target.classList[0];
    const classNames = ['popup-close', 'popup-wrapper'];
    const shoudlClosePopUp = classNames.some(
      // eslint-disable-next-line no-shadow
      (classNames) => classNames === classNameOfClickedElement,
    );
    if (shoudlClosePopUp) {
      popup.style.display = 'none';
    }
  });
  return root;
};

export const modal = {
  confirm: (message, callback) => {
    const template = `<div id="modal-confirm" class="modal-background">
        <div class="modal">
          <span id="close-btn">&times;</span>
          <p class='modalMensage'>${(message) || '???'}</p>
          <div class="buttons">
            <button class="yes" id="confirm-btn"> Sim </button>
            <button class="no" id="no-btn"> Não </button>
          </div>
        </div>
      </div>`;

    const modalElement = document.createElement('div');

    modalElement.innerHTML = template;

    document.body.appendChild(modalElement);

    const confirmBtn = modalElement.querySelector('#confirm-btn');
    const modalBackground = modalElement.querySelector('.modal-background');
    const closeBtn = modalElement.querySelector('#close-btn');
    const noBtn = modalElement.querySelector('#no-btn');

    confirmBtn.addEventListener('click', () => {
      callback();
      modalBackground.style.display = 'none';
    });

    closeBtn.addEventListener('click', () => {
      modalBackground.style.display = 'none';
    });

    noBtn.addEventListener('click', () => {
      modalBackground.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === modalBackground) {
        modalBackground.style.display = 'none';
      }
    });
  },

};

export { popUpNotice };
