'use client'
import React from 'react'
import s from './login.module.scss'
import { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, collection, addDoc, setDoc, doc, getDoc  } from "firebase/firestore";
import app  from '../component/FirebaseApp'

///////////////////////////////////////////////////////////////
//CONSIDER USING FIREBASE REDIRECT ON MOBILE INSTEAD OF POPUP//
///////////////////////////////////////////////////////////////

function Login() {
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  async function createFirestoreUser(user_id, displayname, email) {
    const userRef = doc(db, "users", user_id);
    const userDoc = await getDoc(userRef);
  
    if (userDoc.exists()) {
      console.log("User document already exists");
      return;
    } else {
      await setDoc(userRef, {
        name: displayname,
        email: email,
        sub: "none"
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
      createFirestoreUser(user.uid, user.displayName, user.email)
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
          {user && <h1 style={{color: "black"}}>{user.uid}</h1> }
          <button className={s.black} onClick={() => {googleLogin()}}>google login</button>
          <button className={s.black} onClick={() => {handleSignOut()}}>sign out</button>
      </div>
  )
}

export default Login