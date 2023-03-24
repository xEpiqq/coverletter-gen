"use client";
import React from "react";
import s from "./login.module.scss";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
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
      <div className={s.gradient_background} />
      <div className={s.home}>
        <div className={s.navbar} onClick={() => router.push('/')}>
          <img src="/logo_background.svg" alt="logo" className={s.logo} />
          <h1>GPTCOVERLETTER</h1>
        </div>
        <div className={s.login}>
          {signup === "false" ? <h1>Sign in to</h1> : <h1>Sign up for</h1>}
          <h1>GPTCOVERLETTER</h1>
          <div className={s.login_buttons}>
            <button onClick={() => {googleLogin()}}>
              <img src="/google_logo.svg" />
              Continue with google
            </button>
            <button>
              <img src="/google_logo.svg" />
              Continue with google
            </button>
            <button>
              <img src="/google_logo.svg" />
              Continue with google
            </button>
          </div>
          <h3>
            {signup === "false" ? "No account? " : "Already have an account? "}
            <a onClick={() => setSignup(signup === "true" ? "false" : "true")}>
              {signup === "false" ? "create one" : "login"}{" "}
            </a>
          </h3>
        </div>
      </div>
    </div>
  );

  // return (
  //     <div className={s.home}>
  //         <h1 style={{color: "black"}}>Log in</h1>
  //         {user && <h1 style={{color: "black"}}>{user.displayName}</h1> }
  //         {user && <h1 style={{color: "black"}}>{user.uid}</h1> }
  //         <button className={s.black} onClick={() => {googleLogin()}}>google login</button>
  //         <button className={s.black} onClick={() => {handleSignOut()}}>sign out</button>
  //     </div>
  // )
}

export default Login;
