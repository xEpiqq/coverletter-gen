"use client";
import React from "react";

import s from "./dashboard.module.scss";
import { useState, useEffect } from "react";

import UserDropdown from "../component/UserDropdown";

//imort signout
import { signOut, getAuth } from "firebase/auth";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

import * as pdfjsLib from "pdfjs-dist/webpack";

import app from "../component/FirebaseApp";

import axios from "axios";

export default function Dashboard() {
  const router = useRouter();

  const [openLetter, setOpenLetter] = useState(0);
  const [coverLetterOptions, setCoverLetterOptions] = useState([
    {
      title: "My First Cover Letter",
      content: "This is my first cover letter",
    },
    {
      title: "My Second Cover Letter",
      content: "This is my second cover letter",
    },
    {
      title: "My Third Cover Letter",
      content: "This is my third cover letter",
    },
  ]);

  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [resumePdf, setResumePdf] = useState(undefined);
  const [creativityMeter, setCreativityMeter] = useState(0);
  const [letterText, setLetterText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const [letterTextFlag, setLetterTextFlag] = useState(false);

  const auth = getAuth();
  const [user, loadingUser, error] = useAuthState(auth);

  const uploadResume = (e) => {};

  useEffect(() => {
    console.log("user", user);
    if (!user) return;

    console.log("user.uid", user.uid);

    axios.get("/api/letters/usersLetters?id=" + user.uid).then((res) => {
      setCoverLetterOptions(res.data);
      console.log("res.data", res.data);
    });
  }, [user]);

  const saveCoverLetter = (e) => {
    if (!letterTextFlag) {
      return;
    }
    setLetterTextFlag(false);
    console.log("openletteroptions", coverLetterOptions[openLetter]);
    axios.post(
      "/api/letters/letter",
      {
        user_uid: user.uid,
        letter_uid: coverLetterOptions[openLetter].id,
        letter_title: coverLetterOptions[openLetter].title,
        letter_contents: coverLetterOptions[openLetter].contents,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const createCoverLetter = (e) => {
    console.log("user.uid", user.uid);

    axios.put(
      "/api/letters/letter",
      {
        user_uid: user.uid,
        letter_title: "New Cover Letter",
        letter_contents: "This is a new cover letter",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setCoverLetterOptions([
      ...coverLetterOptions,
      { title: "New Cover Letter", content: "This is a new cover letter" },
    ]);
  };

  const fileUploaded = (e) => {
    // get the text content of the pdf
    const reader = new FileReader();
    let allText = "";
    reader.onload = function (e) {
      const typedarray = new Uint8Array(e.target.result);
      pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
        // put all pages text in a single string
        for (let i = 0; i < pdf.numPages; i++) {
          pdf.getPage(i + 1).then(function (page) {
            page.getTextContent().then(function (textContent) {
              const textItems = textContent.items;
              const finalString = textItems
                .map(function (item) {
                  return item.str;
                })
                .join(" ");
              allText += finalString;
              // print if it is the last page
              if (i === pdf.numPages - 1) {
                setResumePdf(allText.replace(/\s+/g, " ").trim());
              }
            });
          });
        }
      });
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  const handleSidebar = (e) => {
    setSidebarOpen(!sidebarOpen);
  };

  const generateCoverLetter = async (e) => {
    if (loading) return;

    setLoading(true);

    const data = {
      jobTitle,
      jobCompany,
      jobLocation,
      jobDescription,
      additionalInstructions,
      resumePdf,
      creativityMeter,
      user_id: user.uid,
    };

    const res = await fetch("/api/createCoverLetter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    console.log(json);
    setLetterText(json.data);

    if (!res.ok) throw Error(json.message);

    setLoading(false);
  };

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  if (!auth.currentUser) {
    router.push("/login");
  }

  return (
    <div className={s.page}>
      <div className={s.gradient_background}></div>
      <div className={s.navbar}>
        <div className={s.navbar_left}>
          <img className={s.logo} src="/logo.svg" alt="logo" />
          <img
            className={s.sidebar_toggle}
            src="/logo_background.svg"
            alt="logo"
            onClick={handleSidebar}
          />
        </div>
        <div className={s.navbar_center}>
          <img src="/double_arrow_left.svg" alt="logo" />
          <h1>COVER LETTER GENERATOR</h1>
          <img src="/double_arrow_right.svg" alt="logo" />
        </div>
        <div className={s.navbar_right}>
          <UserDropdown user={user} />
        </div>
      </div>
      <div className={s.content}>
        <div
          className={sidebarOpen ? s.content_left_open : s.content_left_closed}
        >
          <div className={s.content_left_top}>
            {sidebarOpen && (
              <button onClick={handleSidebar}>{"< Close"}</button>
            )}
            <button onClick={(e) => createCoverLetter(e)}>
              {"+ New Cover Letter"}
            </button>
          </div>
          <div className={s.content_left_middle}>
            <div className={s.cover_letter_selector_container}>
              {coverLetterOptions.map((coverLetterOption, index) => {
                return (
                  <button
                    className={s.cover_letter_selector_button}
                    key={`coverLetterOption-${index}`}
                    onClick={(e) => {
                      saveCoverLetter(e);
                      setOpenLetter(index);
                      setLetterText(coverLetterOption.contents);
                    }}
                  >
                    <img src="/cover_letter_button_icon.svg" alt="logo" />
                    {coverLetterOption.title}
                  </button>
                );
              })}
            </div>
          </div>
          <div className={s.content_left_bottom}>
            <div className={s.container}>
              <hr />
              <button className={s.subscription_button}>
                <img src="/subscription_icon.svg" alt="logo" />
                Subscription
              </button>
              <button
                className={s.logout_button}
                onClick={() => {
                  signOut(auth);
                  router.push("/");
                }}
              >
                <img src="/logout_icon.svg" alt="logo" />
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className={s.content_center}>
          <div className={s.content_center_textbox}>
            <textarea
              type="text"
              placeholder=""
              value={coverLetterOptions[openLetter].contents}
              onChange={(e) => {
                setLetterTextFlag(true);
                setCoverLetterOptions(
                  coverLetterOptions.map((coverLetterOption, index) => {
                    if (index === openLetter) {
                      return {
                        ...coverLetterOption,
                        contents: e.target.value,
                      };
                    } else {
                      return coverLetterOption;
                    }
                  })
                );
              }}
              onBlur={(e) => saveCoverLetter(e)}
            />
          </div>
          <div className={s.content_center_input_container}>
            <input
              type="text"
              placeholder="Additional instructions here"
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
            />

            <button
              className={loading ? s.loading_button : null}
              onClick={(e) => generateCoverLetter(e)}
            >
              GO!
            </button>
          </div>
        </div>
        <div className={s.content_right}>
          <h2>Details</h2>
          <div className={s.input_container}>
            <label htmlFor="Job input">Job Title</label>
            <input
              onChange={(e) => setJobTitle(e.target.value)}
              value={jobTitle}
              id="Job input"
              className={s.content_right_input}
            />
          </div>
          <div className={s.input_container}>
            <label htmlFor="Company input">Company</label>
            <input
              onChange={(e) => setJobCompany(e.target.value)}
              value={jobCompany}
              id="Company input"
              className={s.content_right_input}
            />
          </div>
          <div className={s.input_container}>
            <label htmlFor="Location input">Location</label>
            <input
              onChange={(e) => setJobLocation(e.target.value)}
              value={jobLocation}
              id="Location input"
              className={s.content_right_input}
            />
          </div>
          <div className={s.input_container_big}>
            <label id="Job Description input">
              Paste the job description here
            </label>
            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              value={jobDescription}
              id="Job Description input"
              className={s.content_right_input_textbox}
            />
          </div>
          <div className={s.input_container}>
            <label htmlFor="Creativity input">The creativity meter</label>

            <input
              type="range"
              min="1"
              max="100"
              value={creativityMeter}
              id="Creativity input"
              onChange={(e) => setCreativityMeter(e.target.value)}
            />
          </div>
          <div className={s.content_right_bottom}>
            <div className={s.nothing_attached_text}>
              {resumePdf ? "Resume attached" : "Nothing currently attached"}
            </div>
            <label className={s.upload_resume_button}>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => fileUploaded(e)}
              />
              Upload CV
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
