import React from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useMutation, gql } from '@apollo/client'
import Preloader from './Preloader'
import Router from 'next/router'
import PropTypes from 'prop-types'


const paymentMutation = gql`
mutation ($amount: Float!, $id: ID!) {
  pay(amount: $amount, id: $id)
}
`;

const CheckoutForm = ({ amount }) => {

    const stripe = useStripe();
    const elements = useElements();

    const [payIt, { loading }] = useMutation(paymentMutation)

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            })

            if (!error) {
                const { id } = paymentMethod;
                payIt({
                    variables: {
                        id,
                        amount: amount * 100 // in paise
                    }
                }).catch(err => console.error(err)).then((data) => {
                    console.log(data);
                    M.toast({ html: 'Payment Done' });
                    Router.push('/thanks');
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) {
        return <Preloader />
    }

    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <CardElement />
                </div>
                <br /><br />
                <div className="input-field center">
                    <button disabled={!stripe} className='btn red' type="submit">
                        Pay
                </button>
                </div>
            </form>
        </div>
    )
}

CheckoutForm.propTypes = {
    amount: PropTypes.number.isRequired,
}

export default CheckoutForm
