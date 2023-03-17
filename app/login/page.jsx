'use client'
import React from 'react'
import s from './login.module.scss'
import { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDdGzzgHKCMZl8NvIBq9LtfRT_kCFrB9eM",
  authDomain: "gptcoverletter.firebaseapp.com",
  projectId: "gptcoverletter",
  storageBucket: "gptcoverletter.appspot.com",
  messagingSenderId: "567270304575",
  appId: "1:567270304575:web:61c11cb0446367aec1418a",
  measurementId: "G-3RTKQQE02X"
};

function Login() {
  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  async function googleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user)
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
      console.log("error signing out")
    }
  }

  return (
      <div className={s.home}>
          <h1 style={{color: "black"}}>Log in</h1>
          {user && <h1 style={{color: "black"}}>{user.displayName}</h1> }
          <button className={s.black} onClick={() => {googleLogin()}}>google login</button>
          <button className={s.black} onClick={() => {handleSignOut()}}>sign out</button>

      </div>
  )
}

export default Login