import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import PropTypes from 'prop-types'


const stripePromise = loadStripe('pk_test_sAAkpEIf41FO9KwfrP2fyDW600UZme4qtF');

const GateWay = ({ amount }) => {

    return (
        <div className="container">
            <p className="flow-text center">Pay</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm amount={amount} />
            </Elements>
        </div>
    )
}

GateWay.propTypes = {
    amount: PropTypes.number.isRequired,
}

export default GateWay
