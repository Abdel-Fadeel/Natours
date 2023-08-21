/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios.post(
      '/users/signup',
      {
        name,
        email,
        password,
        passwordConfirm,
      },
      {
        baseURL: '/api/v1',
        withCredentials: true,
      }
    );

    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const login = async (email, password) => {
  try {
    const res = await axios.post(
      '/users/login',
      {
        email,
        password,
      },
      {
        baseURL: '/api/v1',
        withCredentials: true,
      }
    );

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios.get('/users/logout', {
      baseURL: '/api/v1',
    });

    if ((res.data.status = 'success')) {
      if ((window.location.pathname = '/me')) location.assign('/');
      else location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
