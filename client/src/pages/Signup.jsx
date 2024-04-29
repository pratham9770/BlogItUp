import React, { useState } from 'react'
import {Label, TextInput, Button, Spinner, Alert} from 'flowbite-react';
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function Signup() {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({})
    const [loading,setLoading]=useState(false);
    const [errorMessage,setErrorMessage]=useState(null);
    const handleChange=(event)=>{
        setFormData({...formData,[event.target.id]:event.target.value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!formData.username||!formData.email||!formData.password){
            return setErrorMessage('Please fill out all fields');
          }
        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                return setErrorMessage(data.message);
            }
            setLoading(false);
            if(res.ok){
                navigate('/sign-in');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Error Message:', error.message);
            setErrorMessage(error.message);
            setLoading(false);
        }
    }
    
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
      <Link to="/" className='sm:text-xl font-bold dark:text-white text-4xl'>
        <span className='px-1 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog-It</span>
        Up
      </Link>
      <p className='text-sm mt-5'>
        You can sign up with your email and password or with Google
      </p>
      

      </div>
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit
        }>
            <div className=''>
                <Label value='Your username'/>
                <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
            </div>
            <div className=''>
                <Label value='Your email'/>
                <TextInput type='text' placeholder='name@company.com' id='email' onChange={handleChange}/>
            </div>
            <div className=''>
                <Label value='Your password'/>
                <TextInput type='text' placeholder='Password' id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
               {
                loading ? (
                    <>
                     <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                    </>
                   
                ): 'Sign Up'
               }
            </Button>
            <OAuth />
        </form>
        <div className='flex gap-2 text-sm mt-5'>
            <span>Already have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
                Sign In
            </Link>
            

        </div>
        {errorMessage&&(
            <Alert className='mt-5' color='failure'>
                {errorMessage}
            </Alert>
        )}

      </div>
    </div>
    </div>
  )
}
