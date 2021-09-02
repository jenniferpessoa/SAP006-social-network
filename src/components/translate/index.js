export const translate = () => {
  const flagPt = document.querySelector('[data-pt]');
  const flagEn = document.querySelector('[data-en]');
  const flagEs = document.querySelector('[data-es]');
  const flagFr = document.querySelector('[data-fr]');
  const languages = document.querySelector('[data-lang]');

  languages.classList.toggle('active');
  function hideLang() {
    languages.classList.remove('active');
  }
  function googleTranslateElementInit() {
    // eslint-disable-next-line no-new
    new google.translate.TranslateElement({
      pageLanguage: 'pt',
      includedLanguages: 'en,es,pt,fr',
      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
    }, 'google_translate_element');

    comboGoogleTradutor = document.getElementById('google_translate_element').querySelector('.goog-te-combo');
  }

  languages.addEventListener('click', (e) => {
    if (e.target === flagPt) {
      hideLang();
      const valor = 'pt';
      // eslint-disable-next-line no-use-before-define
      changeLang(valor);
    }
    if (e.target === flagEn) {
      hideLang();
      const valor = 'en';
      // eslint-disable-next-line no-use-before-define
      changeLang(valor);
    }
    if (e.target === flagEs) {
      hideLang();
      const valor = 'es';
      // eslint-disable-next-line no-use-before-define
      changeLang(valor);
    }
    if (e.target === flagFr) {
      hideLang();
      const valor = 'fr';
      // eslint-disable-next-line no-use-before-define
      changeLang(valor);
    }
    googleTranslateElementInit();
  });
  let comboGoogleTradutor = null; // Varialvel global

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
};
