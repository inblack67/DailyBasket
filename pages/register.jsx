import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Preloader from '../components/Preloader';

const registerMutation = gql`
mutation ($name: String!, $email: String!, $password: String!){
    register(name: $name, email: $email, password: $password){
        email
    }
}
`;

const Register = () => {

    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: 'aman',
            email: 'aman@gmail.com',
            password: 'Aman123@'
        }
    });

    const [registerUser, { data, loading }] = useMutation(registerMutation);

    const onLogin = ({ name, email, password }) => {
        setSubmitting(true);
        registerUser({
            variables: {
                name,
                email,
                password
            }
        }).then(() => {
            localStorage.setItem('isAuthenticated', true);
            M.toast({ html: 'Registered!' });
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
            <p className="flow-text center">Register</p>
            <form onSubmit={handleSubmit(onLogin)}>
                <div className="input-field">
                    <input type="text" name='name' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="name"></label>
                    {errors.name ? <span className="helper-text red-text">{errors.name.message}</span> : <span className="helper-text white-text">Name</span>}
                </div>
                <div className="input-field">
                    <input type="email" name='email' ref={register({
                        required: 'Required!'
                    })} />
                    <label htmlFor="email"></label>
                    {errors.email ? <span className="helper-text red-text">{errors.email.message}</span> : <span className="helper-text white-text">Email</span>}
                </div>
                <div className="input-field">
                    <input type="password" name='password' ref={register({
                        required: 'Required!',
                        minLength: {
                            value: 8,
                            message: 'Must be 8 chars'
                        },
                        maxLength: {
                            value: 16,
                            message: 'Cannot exceed 16 chars'
                        },
                        validate: value => {
                            return (
                                [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                    pattern.test(value)
                                ) || "Must include lower, upper, number, and special chars"
                            );
                        },
                    })} />
                    <label htmlFor="password"></label>
                    {errors.password ? <span className="helper-text red-text">{errors.password.message}</span> : <span className="helper-text white-text">Password</span>}
                </div>
                <div className="input-field">
                    <button type="submit" className='btn red' disabled={submitting} >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register
