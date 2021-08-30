// importamos a função que vamos testar
// import { loginEmailAndPassword, signUpWithGoogle, loginWithGmail, keepMeLogged, signOut } 
// from '../src/services/index.js'
import * as services from '../src/services/index.js';

jest.mock('../src/services/index.js');
// jest.mock('loginEmailAndPassword')

describe('loginEmailAndPassword', () => {
  const email = 'user@teste.com';
  const password = '123456';
  it('should be a function', () => {
    expect(typeof services.loginEmailAndPassword).toBe('function');
  });

  // it('should call Firebase loginEmailAndPassword function', () => {
  //   services.loginEmailAndPassword(email, password)
  //   expect(firebase.signInWithEmailAndPassword._isMockFunction).toHaveBeenCalledTimes(1);
  //   expect(firebase.signInWithEmailAndPassword()).toHaveBeenCalledTimes(1);
  // Use .toHaveBeenCalledTimes para garantir que uma função de simulação 
  // (mock, em inglês) foi chamada um número exato de vezes.
  // }); // expect(utils.isAuthorized._isMockFunction).toBeTruthy();
});

describe('signUpWithGoogle', () => {
  const email = 'user@gmail.com';
  const password = '123456';
  it('should be a function', () => {
    expect(typeof services.signUpWithGoogle).toBe('function');
  });
  // it('should call Firebase createUserWithEmailAndPassword function', () => {
  //   signUpWithGoogle(email, password);
  //   expect(firebase.auth).toHaveBeenCalledTimes(1);
  // });
});

describe('loginWithGmail', () => {
  it('should be a function', () => {
    expect(typeof services.loginWithGmail).toBe('function');
  });
  // it('should call Firebase signInWithPopup function', () => {
  //   loginWithGmail('provider');
  //   expect(firebase.auth).toHaveBeenCalledTimes(1);
  // });
});

describe('keepMeLogged', () => {
  it('should be a function', () => {
    expect(typeof services.keepMeLogged).toBe('function');
  });
  // it('should call Firebase setPersistence function', () => {
  //   keepMeLogged('persistence'); //o que recebe como parâmetro?
  //   expect(firebase.auth).toHaveBeenCalledTimes(1);
  // });
});

describe('signOut', () => {
  it('should be a function', () => {
    expect(typeof services.signOut).toBe('function');
  });
  // it('should call Firebase signOut function', () => {
  //   signOut();
  //   expect(firebase.auth).toHaveBeenCalledTimes(1);
  // });
});
