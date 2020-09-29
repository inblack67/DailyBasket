import React from 'react'
import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import Preloader from './Preloader'

const addProductMutation = gql`
mutation ($amount: Float!, $product: ID!){
  addToCart(amount:$amount, product:$product){
    amount,
    product{
      title
    }
  }
}
`;

const CartQuery = gql`
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

const ProductItem = ({ product: { title, description, price, discount, _id } }) => {

    const [addProduct, { loading, data }] = useMutation(addProductMutation, {
        refetchQueries: [{
            query: CartQuery
        }]
    });

    const onAdd = e => {
        addProduct({
            variables: {
                amount: price - discount,
                product: _id
            }
        }).then(() => {
            M.toast({ html: 'Added To Cart' })
        }).catch(err => console.error(err))
    }

    if (loading) {
        return <Preloader />
    }

    return (
        <div className='col s12 m6 l6'>
            <div className='card black'>
                <div className="card-content white-text">
                    <span className="card-title">
                        {title}
                    </span>
                    <p>
                        {description}
                    </p>
                </div>
                <div className="card-action">
                    <a href="#!">
                        {price} Rupees
                    </a>
                    <a href="#!">
                        {discount} Rupees Off
                    </a>
                    <a href="#!" className='secondary-content' onClick={onAdd}>
                        Add To Cart
                    </a>
                </div>
            </div>
        </div>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
}

export default ProductItem
