import Link from 'next/link'

const Navbar = () => {

    return (
        <nav className='red'>
            <div className="nav-wrapper">
                <div className="container">
                    <Link href='/'>
                        <a className="brand-logo">
                            NextOverflow
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;