import React from 'react'
import PropTypes from 'prop-types'

const ProductItem = ({ product: { title, description, price, discount } }) => {

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
                    <a href="#!" className='secondary-content'>
                        {discount} % Off
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
