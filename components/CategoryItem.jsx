import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const CategoryItem = ({ category: { title, description, _id } }) => {

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
                    <Link as={`/category/${_id}`} href={`/category/[id]`}>
                        <a>
                            Explore
                    </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

CategoryItem.propTypes = {
    category: PropTypes.object.isRequired,
}

export default CategoryItem
