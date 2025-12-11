<<<<<<< HEAD
"use client";

import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from './firebase'
import { setDoc, doc } from 'firebase/firestore'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"
import Spinner from '../components/Spinner';

const SignInWithGoogle = () => {
    const [loading, setLoading] = useState(false);
    const [NitUser, setNitUser] = useState(false)
    const router = useRouter();
    function googlelogin() {
        const provider = new GoogleAuthProvider()

        setLoading(true)
        signInWithPopup(auth, provider).then(async (result) => {

            if (result.user) {
                const user = result.user;
                const UserEmail = user.email

                if(UserEmail.startsWith("taps@nitw")){
                    router.push("/TAPS")
                }

                if (!UserEmail.endsWith("@student.nitw.ac.in")) {
                    setLoading(false)
                    alert("Login with Institute Email-ID")
                    return null;
                }
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstname: user.displayName,
                    lastname: "",
                });
                setLoading(false)
                router.push("/student");
            }

        })

    }
    if (loading) return <Spinner />
    return (
        <div>
            <p className='continue-p' style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>--Or continue with--</p>
            <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={googlelogin}>
                <Image src="/google-signin-button.png" alt="Google Button" width={200} height={50} />
            </div>
        </div>
    )
}

export default SignInWithGoogle
=======
import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from './firebase'
import { setDoc, doc } from 'firebase/firestore'
import googleImage from './google-signin-button.png';


const SignInWithGoogle = () => {
    function googlelogin() {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result)
            if (result.user) {
                const user = result.user;

                await setDoc(doc(db, 'Users', user.uid), {
                    email: user.email,
                    firstname: user.displayName,
                    lastname: '',
                    photo: user.photoURL
                })
                window.location.href = '/student'
            }
        })
    }
    return (
        <div>
            <p className='continue-p' style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>--Or continue with--</p>
            <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={googlelogin}>
           <img src={googleImage} width="15%" alt="Sign in with Google" />
            </div>
        </div>
    )
}

export default SignInWithGoogle
>>>>>>> 2ba3b8fe8d16024817ed44cca7ca549c62421b81
