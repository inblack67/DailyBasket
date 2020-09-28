import Link from 'next/link';
import { useMutation, gql } from '@apollo/client';
import Preloader from './Preloader';
import Router from 'next/router';

const logoutMutation = gql`
mutation{
  logout{
    email
  }
}
`;

const Navbar = () => {

    const [logout, { loading }] = useMutation(logoutMutation);

    const onLogout = e => {
        logout().then(() => {
            localStorage.removeItem('isAuthenticated')
            M.toast({ html: 'Logged Out!' })
            Router.replace('/login');
        }).catch(err => {
            M.toast({ html: err });
        });
    }

    if (loading) {
        return <Preloader />
    }

    return (
        <nav className='black'>
            <div className="nav-wrapper">
                <div className="container">
                    <Link href='/'>
                        <a className="brand-logo">
                            Daily<span className="red-text">Basket</span>
                        </a>
                    </Link>
                    <ul className="right">
                        <li>
                            <a href='#!' onClick={onLogout}>
                                Logout
                           </a>
                        </li>
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
                        <li>
                            <Link href='/about'>
                                <a>
                                    About
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