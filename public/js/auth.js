/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios.post(
      '/users/login',
      {
        email,
        password,
      },
      {
        baseURL: 'http://localhost:3000/api/v1',
        withCredentials: true,
      }
    );

    if (res.data.status === 'success') {
      console.log(res);
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
      baseURL: 'http://localhost:3000/api/v1',
    });

    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
