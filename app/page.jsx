"use client";
import React from "react";
import s from "./page.module.scss";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { app } from "./component/FirebaseApp.jsx";
import CreateCLForm from "./component/CreateCLForm";

function Page() {
  const current_movies = [];
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const [addMovie, setAddMovie] = useState("");
  const [rerenderHack, setRerenderHack] = useState(false);
  const [email, setEmail] = useState("");

  function addMovieToList() {
    const addMovieWithoutSpaces = addMovie.replace(/\s/g, "");
    if (addMovieWithoutSpaces !== "") {
      current_movies.push(addMovie);
      setAddMovie("");
    }
  }

  function submitList() {
    if (current_movies.length === 0) {
      alert("Please add a movie to the list");
      return;
    }
    if (email === "") {
      alert("Please enter an email address");
      return;
    }

    current_movies.length = 0;
    console.log("submitted");
    setRerenderHack(!rerenderHack);
  }

  function deleteItem(movie) {
    console.log(movie);
    current_movies.splice(current_movies.indexOf(movie), 1);
    console.log("deleted");
    setRerenderHack(!rerenderHack);
  }

  return (
    <div className={s.page}>
      <div className={s.gradient_background} />
      <div className={s.circle_transition} />
      <div className={s.home}>
        <div className={s.navbar}>
          <div className={s.logo}>
            <img src="/logo.svg" />
            <h3>GPTCOVERLETTER</h3>
          </div>
          <div className={s.login}>
            {!user ? (
              <h1 style={{ marginLeft: "4rem" }}>USER</h1>
            ) : (
              <div className={s.login_button_container}>
                <button className={s.create_account_button}>
                  CREATE AN ACCOUNT
                </button>
                <button className={s.login_button}>LOGIN</button>
              </div>
            )}
          </div>
        </div>
        <div className={s.home_first}>
          <div className={s.home_content}>
            <div className={s.circle}></div>
            <div className={s.home_left}>
              <h1>
                GENERATE COVER
                <br />
                LETTERS IN <span>9</span> SECONDS
              </h1>
              <div className={s.text_box}>
                <button>use full version</button>
              </div>
            </div>
            <div className={s.home_right}>
              <img src="/computer_city.png" />
            </div>
          </div>
        </div>
        <div className={s.home_second}>
          <div className={s.text_container}>
            <h1>Eliminate the headache from job search</h1>
            <h5>
              hit <span>“submit application”</span> that much faster by using
              generative ai
            </h5>
          </div>

          <div className={s.gpt_tech_showcase_container}>
            <div className={s.gpt_tech_showcase_img}>
              <img src="/happy_man.png" />
            </div>
            <div className={s.gpt_tech_showcase_text}>
              <h1>Stable Diffusion 2.0</h1>
              <h5>
                Get involved with the fastest growing open software project.
                Download and join other developers in creating incredible
                applications with stable diffusion as a foundation model.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className={s.bottom_text}>
        <div className={s.feedback_container}>
          <h1>feedback is welcome!</h1>
          <h2>jaydencrowther@gmail.com</h2>
          <h2>wing.b.david@gmail.com</h2>
        </div>
        <div className={s.early_access_banner}>
          <img src="/logo.svg" />
          <h1>GPTCOVERLETTER <span>early access</span></h1>
          <h2>generative ai for your job search</h2>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className={s.home}>
  //     <div className={s.navbar} >
  //       <img src='/ferrett.png' />
  //       <h2>StreamScout</h2>
  //       {user ? <h1 style={{marginLeft: "4rem"}}>{user.displayName}</h1> : <h1>Guest</h1>}
  //       {user ? <img src={user.photoURL} style={{borderRadius: "50rem"}}/> : <h1>Guest</h1>}

  //     </div>
  //     <CreateCLForm />
  //   </div>
  // )
}

export default Page;
