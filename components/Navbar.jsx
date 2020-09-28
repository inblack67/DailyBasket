import Link from 'next/link'

const Navbar = () => {

    return (
        <nav className='red'>
            <div className="nav-wrapper">
                <div className="container">
                    <Link href='/'>
                        <a className="brand-logo">
                            DailyBasket
                        </a>
                    </Link>
                    <ul className="right">
                        <li>
                            <Link href='/login'>
                                <a>
                                    Login
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/register'>
                                <a>
                                    Register
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;