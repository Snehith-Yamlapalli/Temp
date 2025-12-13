"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Login/firebase";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

export default function TPOAuthguard({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTPO, setIsTPO] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        router.push("/");
        return;
      }

      // role check
      if (currentUser.email.endsWith("taps@nitw.ac.in")) {
        setIsTPO(true);
      } else {
        setIsTPO(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 1️⃣ still checking auth
  if (loading) return <Spinner />;

  // 2️⃣ guest → redirected already
  if (!user) return null;

  // 3️⃣ logged in but not TPO → BLOCK UI
  if (!isTPO) {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-danger">Access Restricted</h3>
        <p>This page is only accessible to Training & Placement Officers.</p>
      </div>
    );
  }

  return children;
}
