import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Preloader from '../components/Preloader'
import Link from 'next/link'
import Gateway from '../components/Gateway'

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

    const amount = data.cartProducts.reduce((prev, curr) => curr.amount + prev, 0)

    return (
        <div className='container'>
            <p className="flow-text center">Your <span className="red-text">Cart</span></p>
            <ul className="collection">
                {data && data.cartProducts.map(pro => <li key={pro._id} className='collection-item'>
                    <span className='blue-text'>
                        {pro.product.title}
                    </span>
                    <span className="secondary-content red-text">
                        {pro.amount} Rupees
                    </span>
                </li>)}
            </ul>
            <Gateway amount={amount} />
            <div className='card black white-text center'>
                <div className="card-content">
                    <span className="card-title">
                        Total Amount: <span className="red-text">
                            {amount} Rupees
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default cart
