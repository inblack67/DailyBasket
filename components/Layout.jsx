import Head from 'next/head';
import Navbar from './Navbar';
import Cart from './Cart';

const Layout = ({ children }) => {

    return (
        <div>
            <Head>
                <meta charSet='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                <meta name='description' content='Full Stack E-Commernce Web App With Next.js And GraphQL' />
                <meta name='keywords' content='Next.js, GraphQL, Apollo, JWT, JavaScript, React.js, MongoDB, DailyBasket, Full-Stack, Stripe Payments' />
                <title>DailyBasket</title>
                <link rel="manifest" href="/manifest.json" />
                <link href='./icons/mac.png' rel='icon' type='image/png' sizes='16x16' />
                <link href='./icons/mac.png' rel='icon' type='image/png' sizes='32x32' />
                <link rel="apple-touch-icon" href="./icons/mac.png"></link>
                <meta name="theme-color" content="#000000" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" />
            </Head>
            <Navbar />
            <Cart />
            { children}
        </div>
    )
}

export default Layout
