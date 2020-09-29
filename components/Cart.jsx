import React from 'react'
import Link from 'next/link'

const Cart = () => {
    return (
        <div className="fixed-action-btn">
            <Link href='/cart'>
                <a className="btn-floating btn-large red">
                    <i className="material-icons">
                        shopping_cart
                    </i>
                </a>
            </Link>
        </div>
    )
}

export default Cart
