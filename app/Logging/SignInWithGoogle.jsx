import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from './firebase'
import { setDoc, doc } from 'firebase/firestore'
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignInWithGoogle = () => {
    const router = useRouter();
    function googlelogin() {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result)
            if (result.user) {
                const user = result.user;

                try {
                    console.log("Attempting to write user to Firestore...");

                    await setDoc(doc(db, "Users", user.uid), {
                        email: user.email,
                        firstname: user.displayName,
                        lastname: "",
                    });

                    console.log("Firestore write successful!");

                    router.push("/student");   // Only runs if Firestore write succeeds

                } catch (error) {
                    console.error("🔥 Firestore write FAILED:", error);

                    alert("Failed to save user data. Check console for details.");
                }
            }

        })
    }
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
