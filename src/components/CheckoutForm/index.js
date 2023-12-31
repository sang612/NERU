import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          alert('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          alert('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          alert('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    stripe.confirm;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/notification/second`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" onChange={(e) => setEmail(e.target.value)} />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          style={{ backgroundColor: '#4fc3c5' }}
          className="my-2 p-2 bg-indigo-200 rounded-md text-white text-center inline-block cursor-pointer"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          {isLoading ? <div className="spinner" id="spinner"></div> : <span id="button-text">Pay now</span>}
        </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
