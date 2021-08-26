// import { googleTranslateElementInit } from '../posts/postfunctions.js';

// const popUpNotice = (template) => {
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

//     popUpContent.innerHTML = template;
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

const popUpNotice = () => {
  const root = document.querySelector('.root');

  const popupContainer = document.createElement('div');
  popupContainer.innerHTML = ` 
   
      <div class='popup-wrapper'>
          <div class='popup'>
            <div class='popup-close'> x </div>
            <div class='popup-content'>
              <p>IDIOMAS</p>
              <div id="google_translate_element" class="boxTradutor"></div>
              <i data-port='port' class='lang-port'>port</i>
              <i data-eng='eng' class='lang-port'>eng</i>            
            </div>      
          </div>
        </div>
    `;
  root.appendChild(popupContainer);

  const popup = root.querySelector('.popup-wrapper');
  const popUpContent = root.querySelector('.popup-content');

  function exibeModal() {
    popup.style.display = 'block';

    // popUpContent.innerHTML = template;
  }
  exibeModal();

  var comboGoogleTradutor = null

  function googleTranslateElementInit() {
    new google.translate.TranslateElement({ // eslint-disable-line no-unused-vars
      pageLanguage: 'pt', // Idioma principal da página
      includedLanguages: 'en,es', // Idiomas que pode traduzir
      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
    }, 'google_translate_element'); // google_translate_element é o elemento no div
    comboGoogleTradutor = document.getElementById("google_translate_element")
  }

  function changeEvent(el) {
    if (el.fireEvent) {
        el.fireEvent('onchange')
    } else {
        var evObj = document.createEvent("HTMLEvents")

        evObj.initEvent("change", false, true)
        el.dispatchEvent(evObj)
    }
}





  // for (const partOfTemplate of popupContainer) {
  popupContainer.addEventListener('click', (event) => {
    const e = event.target;
    if (e.dataset.port) {
      console.log('oi');
    }
    if (e.dataset.eng) {
      console.log('non');
    }
  });
  // }

  // popup.addEventListener('click', (event) => {
  //   const classNameOfClickedElement = event.target.classList[0];
  //   const classNames = ['popup-close', 'popup-wrapper'];
  //   const shoudlClosePopUp = classNames.some(
  //     (classNames) => classNames === classNameOfClickedElement,
  //   );
  //   if (shoudlClosePopUp) {
  //     popup.style.display = 'none';
  //   }
  // });
  // return root;
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
