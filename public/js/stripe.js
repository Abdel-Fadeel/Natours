import axios from 'axios';
import { showAlert } from './alerts';

export const stripe = Stripe(
  'pk_test_51NWgvMGQU9oQvjcelQgizdr5inMpzFxWtCACc8CJ0uw0aI3QCdM2DBlDfZ3lVYDEmJJfgF8z3UPpnFSECKxpkTAQ00QmIeTOuY'
);

export const bookTour = async (tourId) => {
  try {
    const res = await axios.get(`/checkout-session/${tourId}`, {
      baseURL: 'http://localhost:3000/ap/v1/bookings',
      withCredentials: true,
    });
    await stripe.redirectToCheckout({
      sessionId: res.data.session.id,
    });
  } catch (err) {
    showAlert(
      'error',
      err.response.data.message ||
        'Something went wrong! Please try again later.'
    );
  }
};
