import React from 'react'
import PropTypes from 'prop-types'

const ProductItem = ({ product, product: { title, description } }) => {

    return (
        <div className='col s12 m6 l6'>
            <div className='card grey darken-3'>
                <div className="card-content white-text">
                    <span className="card-title">
                        {title}
                    </span>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
}

export default ProductItem
