"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Login/firebase";   // adjust path to your firebase.js
import { useRouter } from "next/navigation";
import Spinner from './Spinner';


export default function AuthGuard({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        router.push("/"); // redirect if not logged in
      } else if (!currentUser.email.endsWith("@student.nitw.ac.in")) {
        alert("Login with Student ID")
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);


  if (loading) return <Spinner />
  if (!user) return null;

  return children;
}
