import axios from 'axios';
import { showAlert } from './alerts';

// "type" is "password" or "data"
export const updateSettings = async (data, type) => {
  try {
    const url = type === 'password' ? 'updateMyPassword' : 'updateMe';
    const response = await axios.patch(`/users/${url}`, data, {
      baseURL: 'http://localhost:3000/api/v1',
      withCredentials: true,
    });

    if ((response.data.status = 'success')) {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      if (type === 'data')
        window.setTimeout(() => {
          location.assign('/me');
        }, 1500);

      return true;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);

    return false;
  }
};
