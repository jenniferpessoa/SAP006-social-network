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
    //console.log(confirmBtn)
    const modalBackground = modalElement.querySelector('.modal-background');
    //console.log(modalBackground)
    const closeBtn = modalElement.querySelector('#close-btn');
    //console.log(closeBtn)
    const noBtn = modalElement.querySelector('#no-btn');
    //console.log(noBtn)

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
