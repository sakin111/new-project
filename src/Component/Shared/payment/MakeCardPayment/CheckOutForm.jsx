import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    try {
      const { error: paymentError, paymentMethod: paymentMethodResult } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      });

      if (paymentError) {
        setError(paymentError);
        return;
      }

      setPaymentMethod(paymentMethodResult);

      // SweetAlert2 here
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: 'Your payment has been processed successfully.',
        confirmButtonColor: '#10b981',
      });
    } catch (err) {
      setError(err);
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {paymentMethod ? (
        <div className="text-center p-6 bg-green-50 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Payment Successful!
          </h2>
          <p className="text-green-600 mb-4">
            Payment method has been saved successfully.
          </p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors"
          >
            Make Another Payment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 p-4   bg-white rounded-lg shadow-md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="John Doe"
                value={billingDetails.name}
                onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="john@example.com"
                value={billingDetails.email}
                onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="(555) 555-5555"
                value={billingDetails.phone}
                onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Details
              </label>
              <div className="p-4 border rounded-lg bg-gray-50">
                <CardElement
                  options={CARD_OPTIONS}
                  onChange={(e) => {
                    setError(e.error);
                    setCardComplete(e.complete);
                  }}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">{error.message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={processing || !stripe || paymentMethod}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors
    ${(processing || !stripe || paymentMethod)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800"
              }`}
          >
            {processing ? (
              <div className="flex items-center justify-center gap-2">
                <span>Processing...</span>
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckOutForm;
