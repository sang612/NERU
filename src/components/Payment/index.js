import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import CheckoutForm from '../CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  'pk_test_51MZnsEIJMS5JJPnFjyFeuJK1IytiC751M5FVqJ7Jz2Q4nErUzY2MsfYqMqL31RSKVxNvmdsUc4BaS12a4hbUQ3Il00sHl7MMu5'
);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#root");

function PaymentModal({ isOpen, setIsOpen }) {
  const [clientSecret, setClientSecret] = useState('');

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (isOpen) {
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZiODBiYWM3ODEyMTA4N2UzZjAzMDUiLCJpYXQiOjE2Nzc0NzA0NTYsImV4cCI6MTY3NzY0MzI1Nn0.BAYYUmPv25A6gmhBYXTWoLIRm_b9IPcj8FFBo6IUKNI',
        },
        body: JSON.stringify({ amount: 1, productId: 'prod_NLdaPYtT9DqNjE' }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [isOpen]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className="App">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default PaymentModal;
