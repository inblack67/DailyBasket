import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/CheckoutForm'

const stripePromise = loadStripe('pk_test_sAAkpEIf41FO9KwfrP2fyDW600UZme4qtF');

const GateWay = () => {

    return (
        <div className="container">
            <p className="flow-text center">Pay</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}

export default GateWay
