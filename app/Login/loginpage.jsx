"use client";

import React, { useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'
import SignInWithGoogle from './SignInWithGoogle'
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [Email, setEmail] = useState()
  const [passowrd, setpassword] = useState()
  const [loading, setLoading] = useState(false)

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, Email, passowrd);
      if (Email.endsWith("taps@nitw.ac.in")) {
        router.push("/TAPS")
      }

      if (!Email.endsWith("@student.nitw.ac.in")) {
        setLoading(false)
        alert("Login with Institute Email-ID")
        return null;
      }

      router.push("/student/Home");
    } catch (error) {
      console.log(error.message)
      alert(error)
    }
  }
  function navreg() {
    router.push("/Register");
  }

  return (
    <form onSubmit={handlesubmit}>
      <Header />
      <div className='row justify-content-center' style={{ backgroundColor: 'rgb(208, 214, 206)' }}>
        <div className='col-md-6 bg-red p-3 mb-5 d-flex flex-column gap-3 align-items-center'>
          <input type="email" placeholder='Email' className='form-control' onChange={(e) => { setEmail(e.target.value) }} />
          <input type="current-password" placeholder='Password' className='form-control' onChange={(e) => { setpassword(e.target.value) }} />
          <input type="submit" className='btn btn-primary' value='Login In' style={{ width: '120px' }} />
          <input type="button" className='btn btn-primary' value='Register' onClick={navreg} />
        </div>
        <SignInWithGoogle />
      </div>
      <Footer />
    </form>
  )
}

export default Login
