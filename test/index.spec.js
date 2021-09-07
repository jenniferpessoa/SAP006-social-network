/**
 * @jest-environment jsdom
 */

import { Login } from '../src/pages/singin/login.js';
import { SignUp } from '../src/pages/singin/register.js';
import { Reset } from '../src/pages/singin/reset.js';
import * as services from '../src/services/index.js';
import { navigation } from '../src/routes/navigation.js';

jest.mock('../src/services/index.js');
jest.mock('../src/routes/navigation.js');
window.alert = jest.fn();

describe('Login', () => {
  const loginPage = Login();
  it('should load', () => {
    expect(Login()).toMatchSnapshot();
  });
  it('should login with email and password', () => {
    services.loginEmailAndPassword.mockResolvedValueOnce(true);
    loginPage.querySelector('#email').value = 'teste@teste.com';
    loginPage.querySelector('#password').value = '12345678';
    loginPage.querySelector('#buttonLogin').dispatchEvent(new Event('click'));
    expect(services.loginEmailAndPassword).toBeCalled();
    expect(services.loginEmailAndPassword).toHaveBeenCalledWith('teste@teste.com', '12345678');
  });

  it('should login with google account', () => {
    services.loginWithGmail.mockResolvedValueOnce(true);
    loginPage.querySelector('#btnGmail').dispatchEvent(new Event('click'));
    expect(services.loginWithGmail).toBeCalled();
  });
  it('should redirect to reset password page', () => {
    loginPage.querySelector('#reset').dispatchEvent(new Event('click'));
    expect(navigation).toBeCalledWith('/reset');
  });
});

describe('register', () => {
  const signUpPage = SignUp();
  it('should load page', () => {
    expect(SignUp()).toMatchSnapshot();
  });
  it('should siogn up with email and password', () => {
    services.signUpWithEmailAndPassword.mockResolvedValueOnce(true);
    signUpPage.querySelector('#email').value = 'teste@teste.com';
    signUpPage.querySelector('#password').value = '12345678';
    signUpPage.querySelector('#signUpButton').dispatchEvent(new Event('click'));
    expect(services.signUpWithEmailAndPassword).toBeCalled();
    expect(services.signUpWithEmailAndPassword).toHaveBeenCalledWith('teste@teste.com', '12345678');
  });
  it('should redirect to login  page', () => {
    signUpPage.querySelector('.opt-login').dispatchEvent(new Event('click'));
    expect(navigation).toBeCalledWith('/');
  });
});

describe('reset', () => {
  const resetPage = Reset();
  it('should load reset page', () => {
    expect(Reset()).toMatchSnapshot();
  });
  it('should siogn up with email and password', () => {
    window.alert.mockClear();
    services.resetPassword.mockResolvedValueOnce(true);
    resetPage.querySelector('#email').value = 'teste@teste.com';
    resetPage.querySelector('#buttonReset').dispatchEvent(new Event('click'));
    expect(services.resetPassword).toBeCalled();
    expect(services.resetPassword).toHaveBeenCalledWith('teste@teste.com');
  });
});
