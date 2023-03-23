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
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";

const ipsum_words =
[
  "Dear Hiring Manager, \nI am writing to express my interest in the open position at your company. My name is John Doe and I believe that my skills and experience make me a strong candidate for the role. I am an experienced professional with a proven track record of success in the industry. \nIn my previous role at XYZ Company, I was responsible for managing a team of professionals and overseeing the implementation of several successful projects. I have extensive experience in project management, strategic planning, and team leadership. I am confident that my skills and experience would be a valuable asset to your team.\n I hold a Bachelor's degree in Business Administration from ABC University and have completed several professional development courses in project management and leadership. I am a highly motivated individual with a strong work ethic and a commitment to excellence. I am confident that I have the skills and experience necessary to excel in this role and contribute to the success of your company. \nThank you for considering my application. I look forward to the opportunity to further discuss my qualifications with you. \nSincerely, John Doe",

]

function Page() {
  const current_movies = [];
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

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
            {false ? (
              <h1 style={{ marginLeft: "4rem" }}>USER</h1>
            ) : (
              <div className={s.login_button_container}>
                <button
                  className={s.create_account_button}
                  onClick={() => router.push("/login?signup=true")}
                >
                  CREATE AN ACCOUNT
                </button>
                <button
                  className={s.login_button}
                  onClick={() => router.push("/login?signup=false")}
                >
                  LOGIN
                </button>
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
                <span>
                <Typewriter
                  words={ipsum_words}
                  loop={5}
                  cursor
                  cursorStyle="_"
                  typeSpeed={40}
                  deleteSpeed={10}
                  delaySpeed={1000}
                />
                </span>
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
          <h1>
            GPTCOVERLETTER <span>early access</span>
          </h1>
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
