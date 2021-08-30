const firebaseErrors = {
  'auth/invalid-email': 'O endereço de e-mail está mal formatado.',
  'auth/email-already-in-use': 'Endereço de e-mail já cadastrado.',
  'auth/wrong-password': 'Senha e/ou e-mail incorretos.',
  'auth/weak-password': 'A senha deve ter 6 caracteres ou mais.',
  'auth/user-not-found': 'Usuário não encontrado',
  'auth/invalid-user-token': 'O usuário deve entrar novamente',
  'auth/invalid-auth-event': 'Ocorreu um erro interno',
  'auth/cancelled-popup-request': 'Operação cancelada devido a outro popup conflitante.',
  'auth/network-request-failed': 'Ocorreu um erro na rede.',
};

function printError(message) {
  const element = document.createElement('p')
  element.innerHTML = message;
  const errors = document.querySelector('.errors');
  errors.innerHTML = '';
  errors.appendChild(element);
}

export const getError = (errorCode) => {
  const error = errorCode.code;
  const errorMessage = firebaseErrors[error];
  if (errorMessage) {
    printError(errorMessage);
  } else {
    // eslint-disable-next-line no-alert
    window.alert('ocorreu um erro', error);
  }
};
