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
    if (shoudlClosePopUp) {
      popup.style.display = 'none';
    }
  });
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
