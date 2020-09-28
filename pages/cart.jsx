import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Preloader from '../components/Preloader'
import Link from 'next/link'

const MyQuery = gql`
{
  cartProducts{
    amount
    _id
    product{
        title
    }
  }
}
`;

const cart = () => {

    const { loading, data } = useQuery(MyQuery);

    if (loading) {
        return <Preloader />
    }

    const { cartProducts } = data;

    const amount = cartProducts.reduce((prev, curr) => curr.amount + prev, 0)

    return (
        <div className='container'>
            <p className="flow-text center">Your Cart</p>
            <ul className="collection">
                {cartProducts.map(pro => <li key={pro._id} className='collection-item'>
                    <span>
                        {pro.product.title}
                    </span>
                    <span className="secondary-content">
                        {pro.amount}
                    </span>
                </li>)}
            </ul>
            <div className='card black white-text'>
                <div className="card-content">
                    <span className="card-title">
                        Total Amount: <span className="red-text">
                            {amount} Rupees
                        </span>
                    </span>
                </div>
                <div className="card-action">
                    <Link href='/pay'>
                        <a>Proceed To Pay</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default cart
