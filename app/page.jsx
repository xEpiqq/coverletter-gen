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
import app from "./component/FirebaseApp";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";
import UserDropdown from "./component/UserDropdown";


const ipsum_words = [
  "Dear Hiring Manager, \nI am writing to express my interest in the open position at your company. My name is John Doe and I believe that my skills and experience make me a strong candidate for the role. I am an experienced professional with a proven track record of success in the industry. \nIn my previous role at XYZ Company, I was responsible for managing a team of professionals and overseeing the implementation of several successful projects. I have extensive experience in project management, strategic planning, and team leadership. I am confident that my skills and experience would be a valuable asset to your team.\n I hold a Bachelor's degree in Business Administration from ABC University and have completed several professional development courses in ",
];

function Page() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  return (
    <div className={s.page}>
      <div className={s.gradient_background}></div>
      <div className={s.circle_transition} />
      <div className={s.circle_transition} />
      <div className={s.home}>
        <div className={s.navbar}>
          <div className={s.logo}>
            <img alt="logo" src="/logo.svg" />
            <h3>GPTCOVERLETTER</h3>
          </div>
          <div className={s.login}>
            {user ? (
              <UserDropdown user={user} />
            ) : (
              <div className={s.login_button_container}>
                <button
                  className={s.create_account_button}
                  onClick={() => router.push("/freetrial")}
                >
                  Try For Free
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
                    loop
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
              <img alt="computer city scape" src="/computer_city.png" />
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
              <img alt="happy excited man" src="/happy_man.png" />
            </div>
            <div className={s.gpt_tech_showcase_text}>
              <h1>GPT 3.5</h1>
              <h5>
                By harnessing the power of GPT-3.5, you can create 
                cover letters that are both impressive and tailored to the
                specific requirements of the job youre applying for. GPT-3.5
                can help you identify keywords and phrases that will catch the
                attention of hiring managers, and suggest powerful and
                persuasive language to help you stand out from the crowd.
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
          <img alt="logo" src="/logo.svg" />
          <h1>
            GPTCOVERLETTER <span>early access</span>
          </h1>
          <h2>generative ai for your job search</h2>
        </div>
      </div>
    </div>
  );

}

export default Page;
