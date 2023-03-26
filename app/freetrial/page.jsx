"use client";
import React from "react";
import s from "./freetrial.module.scss";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import app from '../component/FirebaseApp'
import { useRouter } from "next/navigation";

///////////////////////////////////////////////////////////////
//CONSIDER USING FIREBASE REDIRECT ON MOBILE INSTEAD OF POPUP//
///////////////////////////////////////////////////////////////

function Login({ searchParams }) {
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [signup, setSignup] = useState(searchParams.signup);

  useEffect(() => {
    console.log(router.query);
  }, [router]);

  async function createFirestoreUser(user_id, displayname, email) {
    const userRef = doc(db, "Users", user_id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      console.log("User document already exists");
      return;
    } else {
      await setDoc(userRef, {
        name: displayname,
        email: email,
        sub: "none",
      });
      console.log("User document created");
    }
  }

  async function googleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      createFirestoreUser(user.uid, user.displayName, user.email);
      const additionalUserInfo = await getAdditionalUserInfo(result);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error signing out");
    }
  }

  return (
    <div className={s.page}>
        <img src="/freetrial_logo.png" className={s.logo} draggable={false} onClick={() => router.push('/')}/>
        <div className={s.box}>
          <h1 className={s.box_lt}>Start Your 14-Day</h1>
          <h1 className={s.box_lt}>Free Trial Now!</h1>
          <h2 className={s.box_st}>No risk, no contracts, and no long-term commitment. Cancel anytime, hassle-free.</h2>

          <div className={s.bar}>
            <div className={s.cbar}/>
          </div>
        <div className={s.onetwo}>
          <h2 className={s.box_st}>Create account with</h2>
          <h2 className={s.box_st}>1 / 2</h2>
        </div>


        <div className={s.btns}>
          <button className={s.authbtn} onClick={googleLogin}> 
          <img src="/google.png" className={s.googleimg}/> Sign up with Google
          </button>

          <button className={`${s.authbtn} ${s.fb}`} onClick={googleLogin}> 
          <img src="/facebook.png" className={s.googleimg}/> Sign up with Facebook
          </button>
        </div>


        </div>
    </div>
  );

}

export default Login;
