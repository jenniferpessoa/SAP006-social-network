/* eslint-disable no-new */
const popUpNotice = (template) => {
  const root = document.querySelector('.root');

  const popupContainer = document.createElement('div');
  popupContainer.innerHTML = ` 
      <div class='popup-wrapper'>
          <div class='popup'>
            <div class='popup-close'> x </div>
            <div id="google_translate_element" class='popup-content'></div>      
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
    const flagPt = popupContainer.querySelector('[data-pt]');
    const flagEn = popupContainer.querySelector('[data-en]');
    const flagEs = popupContainer.querySelector('[data-es]');
    const flagFr = popupContainer.querySelector('[data-fr]');

    if (shoudlClosePopUp) {
      popup.style.display = 'none';
    }
    if (event.target === flagPt) {
      const valor = 'pt';
      // eslint-disable-next-line no-use-before-define
      changeLang(valor);
    }
    if (event.target === flagEn) {
      const valor = 'en';
      // eslint-disable-next-line no-use-before-define
      changeLang(valor);
    }
    if (event.target === flagEs) {
      const valor = 'es';
      // eslint-disable-next-line no-use-before-define
      changeLang(valor);
    }
    if (event.target === flagFr) {
      const valor = 'fr';
      // eslint-disable-next-line no-use-before-define
      changeLang(valor);
    }
  });

  let comboGoogleTradutor = null; // Varialvel global

  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'pt',
      includedLanguages: 'en,es,pt,fr',
      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
    }, 'google_translate_element');

    comboGoogleTradutor = document.getElementById('google_translate_element').querySelector('.goog-te-combo');
  }

  function changeEvent(el) {
    if (el.fireEvent) {
      el.fireEvent('onchange');
    } else {
      const evObj = document.createEvent('HTMLEvents');

      evObj.initEvent('change', false, true);
      el.dispatchEvent(evObj);
    }
  }

  function changeLang(lang) {
    if (comboGoogleTradutor) {
      comboGoogleTradutor.value = lang;
      changeEvent(comboGoogleTradutor);// Dispara a troca
    }
  }
  googleTranslateElementInit();
  return root;
};

// export const popUpConfirmDelete = () => {
//   const root = document.querySelector('.root');

//   const popupContainer = document.createElement('div');
//   popupContainer.innerHTML = `

//       <div class='popup-wrapper'>
//           <div class='popup'>
//             <div class='popup-close'> x </div>
//             <div class='popup-content'></div>
//           </div>
//         </div>
//     `;
//   root.appendChild(popupContainer);

//   const popup = root.querySelector('.popup-wrapper');
//   const popUpContent = root.querySelector('.popup-content');

//   function exibeModal() {
//     popup.style.display = 'block';

//     // popUpContent.innerHTML = `
//     // <div class='container'>
//     //   <div id='yes' class='yes'>SIM</div>
//     //   <div id='no' class='não'>NAO</div>
//     // <div>
//     // `;
//   }
//   exibeModal();

//   popup.addEventListener('click', (event) => {
//     const classNameOfClickedElement = event.target.classList[0];
//     const classNames = ['popup-close', 'popup-wrapper'];
//     const shoudlClosePopUp = classNames.some(
//       (classNames) => classNames === classNameOfClickedElement,
//     );
//     if (shoudlClosePopUp) {
//       popup.style.display = 'none';
//     }
//   });
//   return root;
// }

export { popUpNotice };
