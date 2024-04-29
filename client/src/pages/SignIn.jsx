import React, { useState } from 'react';
import { Label, TextInput, Button, Spinner, Alert } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill all the fields'));
        }
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message); // Throwing an error here
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto md:flex-row md:items-center gap-5'>
                <div className='flex-1'>
                    <Link to="/" className='sm:text-xl font-bold dark:text-white text-4xl'>
                        <span className='px-1 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog-It</span>
                        Up
                    </Link>
                    <p className='text-sm mt-5'>
                        You can sign in with your email and password
                    </p>
                </div>
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className=''>
                            <Label value='Your email' />
                            <TextInput type='text' placeholder='name@company.com' id='email' onChange={handleChange} />
                        </div>
                        <div className=''>
                            <Label value='Your password' />
                            <TextInput type='password' placeholder='**********' id='password' onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className='pl-3'>Loading...</span>
                                    </>
                                ) : 'Sign In'}
                            </Button>
                            <div className="oauth-container" style={{ width: '100%', height: '100%' }}>
                                <OAuth />
                            </div>
                        </div>
                    </form>
                  
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Don't have an account?</span>
                        <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
                    )}
                </div>
            </div>
        </div>
    );
}
