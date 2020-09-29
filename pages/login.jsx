import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';
import Preloader from '../components/Preloader';

const loginMutation = gql`
mutation ($email: String!, $password: String!){
    login(email: $email, password: $password){
        email
    }
}
`;

const Login = () => {

    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, errors } = useForm();

    const [login, { loading, data }] = useMutation(loginMutation);

    const onLogin = ({ email, password }) => {
        setSubmitting(true);

        login({
            variables: {
                email,
                password
            },
        }).then(() => {
            localStorage.setItem('isAuthenticated', true);
            M.toast({ html: 'Logged In!' });
            Router.push('/');
        }).catch(err => {
            M.toast({ html: err });
        });

        setSubmitting(false);
    }

    if (loading) {
        return <Preloader />
    }

    return (
        <div className='container'>
            <p className="flow-text center">Login</p>
            <form onSubmit={handleSubmit(onLogin)}>
                <div className="input-field">
                    <input type="email" name='email' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="email"></label>
                    {errors.email ? <span className="helper-text red-text">{errors.email.message}</span> : <span className="helper-text ">Email</span>}
                </div>
                <div className="input-field">
                    <input type="password" name='password' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="password"></label>
                    {errors.password ? <span className="helper-text red-text">{errors.password.message}</span> : <span className="helper-text ">Password</span>}
                </div>
                <div className="input-field">
                    <button type="submit" className='btn red' disabled={submitting} >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
