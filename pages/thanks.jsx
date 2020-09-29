import React from 'react'
import Link from 'next/link'

const thanks = () => {
    return (
        <div className='container center'>
            <p className="flow-text">Thank you for shopping with us! You will hear from our shipping team via email soon.</p>
            <Link href='/'>
                <a className='btn red pulse'>
                    Continue Shopping
                </a>
            </Link>
        </div>
    )
}

export default thanks
