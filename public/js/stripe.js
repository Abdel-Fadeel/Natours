import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    // 1) Get a Checkout Session from the API
    const res = await axios.get(`/bookings/checkout-session/${tourId}`, {
      baseURL: '/api/v1',
      withCredentials: true,
    });
    // 2) Redirect to the Stripe-hosted checkout page
    window.location.assign(res.data.session.url);
  } catch (err) {
    showAlert(
      'error',
      (err.response && err.response.data && err.response.data.message) ||
        'Something went wrong! Please try again later.'
    );
  }
};
