import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);


const Payment = () => {
  return (
    <div className="w-full max-w-md mx-auto my-10">
<h4 className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-violet-800 via-indigo-500 to-sky-700 font-semibold text-center font-Lato lg:text-4xl md:text-3xl">
  Stripe Pay
</h4>

      <Elements stripe={stripePromise}  >
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default Payment;