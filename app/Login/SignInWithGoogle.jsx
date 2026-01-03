import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from './firebase'
import { setDoc, doc } from 'firebase/firestore'
import Image from "next/image";
import googleImage from "./google-signin-button.png";
import { getAuth } from "firebase/auth";
import { useRouter } from 'next/navigation';

const SignInWithGoogle = () => {
    const [data, setdata] = useState()
    const [name, setname] = useState()
    const [email, setEmail] = useState()
    const [rollno, setusername] = useState()
    const [branch, setbranch] = useState()
    const [batch, setbatch] = useState()
    const [degree, setdegree] = useState()
    const router = new useRouter()

    function extractStudentInfo(email) {
        const username = email.split("@")[0].toLowerCase();
        const match = username.match(/^[a-z]{2}(\d{2})([a-z]{2})([a-z]).*$/);

        if (!match) throw new Error("Invalid email format");

        const admissionYear = 2000 + parseInt(match[1]);
        const branchCode = match[2];
        const degreeCode = match[3];

        const branchMap = {
            cs: "CSE",
            ee: "EEE",
            ec: "ECE",
            me: "MECH",
            ce: "CIVIL",
        };

        const degreeMap = {
            b: "B.Tech",
            m: "M.Tech",
        };

        return {
            rollno: username.slice(2).toUpperCase(), // 🔑 THIS becomes id
            branch: branchMap[branchCode],
            degree: degreeMap[degreeCode],
            batch: admissionYear + 4,
        };
    }

    //////////////////////////////////////////////////////////////////////////
    function googlelogin() {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result)
            if (result.user) {
                const user = result.user;
                setdata(user)
                setname(user.displayName)

                await setDoc(doc(db, 'Users', user.uid), {
                    email: user.email,
                    firstname: user.displayName,
                    lastname: '',
                    photo: user.photoURL
                })
                // setloading(true)
                const info = extractStudentInfo(user.email);

                const authenicate = getAuth();
                const authuser = authenicate.currentUser;
                const idToken = await authuser.getIdToken();

                const encodedEmail = encodeURIComponent(user.email);
                const rollno = user.email.slice(2, 11).toLocaleUpperCase()
                const res = await fetch(`/api/studentDetails/${rollno}`);


                if (res.status === 404) {
                    const payload = {
                        name: user.displayName,
                        email: user.email,
                        rollno: info.rollno,   // ✅ ALWAYS defined
                        branch: info.branch,
                        batch: info.batch,
                        degree: info.degree,
                    };
                    console.log("Inserting the student data")
                    const res = await fetch("/api/studentDetails", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${idToken}`
                        },
                        body: JSON.stringify(payload),
                    });
                    console.log("Done with insertion")
                }
                router.replace("/student/Home");
            }
        })
    }
    return (
        <div>
            <p className='continue-p' style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>--Or continue with--</p>
            <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={googlelogin}>
                <Image src={googleImage} alt="Sign in with Google" width={200} height={60} />
            </div>
        </div>
    )
}

export default SignInWithGoogle