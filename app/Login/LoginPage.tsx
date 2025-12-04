"use client";
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from './firebase'
import SignInWithGoogle from './SignInWithGoogle'

const Login = () => {
    const [Email, setEmail] = useState<string>(''); 
    const [password, setPassword] = useState<string>('');


    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth,Email,password);
            alert('User logged in successfully')
            window.location.href = '/student'
        } catch(error){
            alert(error)
        }
    }
    function navreg()
    {
        window.location.href = '/Register'
    }

  return (
    <form onSubmit={handlesubmit}>
      <h1 className='text-center mb-4'>Login</h1>
      <div className='row justify-content-center' style={{backgroundColor:'rgb(208, 214, 206)'}}>
        <div className='col-md-6 bg-red p-3 mb-5 d-flex flex-column gap-3 align-items-center'>
        <input type="email" placeholder='Email' className='form-control' onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder='Password' className='form-control' onChange={(e)=>{setPassword(e.target.value)}}/>
        <input type="submit" className='btn btn-primary' value='Login In' style={{width:'120px'}}/>
        <input type="button" className='btn btn-primary' value='Register' onClick={navreg}/>
        </div>
        <SignInWithGoogle/>
      </div>
    </form>
  )
}

export default Login
