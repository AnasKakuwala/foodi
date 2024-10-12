import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import { useState } from 'react';
import { FaPaypal } from "react-icons/fa"

const CheckoutForm = ({price,cart}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState()

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          console.log('[error]', error);
          setCardError(error);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
        }
      };

      
  return (
    <div className='flex flex-col sm:flex-row justify-start items-start gap-8'>

        {/* left side */}
        <div className='md:w-1/2 w-full space-y-3'>
            <h4 className='text-lg font-semibold text-black '>Order Summary</h4>
            <p className='text-black'>Total Price : Rs. {price}</p>
            <p className='text-black'>Total Items : {cart.length}</p>
        </div>

        {/* right side */}
        <div className='md:w-1/3 w-full space-y-3 card bg-base-100 px-4 py-8 max-w-sm shrink-0 shadow-2xl'> 
            <h4 className='text-lg font-semibold  '>Process Your Payment</h4>
            <h5 className='font-medium'>Credit/Debit Card</h5>

            {/* stripe form */}
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
                <button className='btn btn-sm mt-5 btn-primary w-full text-white' type="submit" disabled={!stripe}>
                    Pay
                </button>
                </form>    
                
               {
                cardError ? <p>{cardError}</p>:""
               }

                {/* paypal */}
                <div className='mt-5 text-center'>
                <button className='btn btn-sm mt-5 bg-orange-500 text-white' type="submit">
                    <FaPaypal/> Pay With Paypal!
                </button>
                </div>
        </div>
    </div>
  )
}

export default CheckoutForm