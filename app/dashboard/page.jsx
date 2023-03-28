"use client";
import React from "react";

import s from "./dashboard.module.scss";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [openLetter, setOpenLetter] = useState(0);
  const [coverLetterOptions, setCoverLetterOptions] = useState([
    {title: "My First Cover Letter", content: "This is my first cover letter"},
    {title: "My Second Cover Letter", content: "This is my second cover letter"},
    {title: "My Third Cover Letter", content: "This is my third cover letter"},
  ]);

  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [resumePdf, setResumePdf] = useState("");
  const [creativityMeter, setCreativityMeter] = useState(0);
  const [letterText, setLetterText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadResume = (e) => {};

  useEffect(() => {
    const res = fetch("/api/getUsersLetters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(""),
    }).then((res) => {
      const json = res.json().then((json) => {
        setCoverLetterOptions(json.data);
      });
    });
  }, []);

  const createCoverLetter = (e) => {
    setCoverLetterOptions([...coverLetterOptions, {title: "New Cover Letter", content: "This is a new cover letter"}]);
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

  return (
    <div className={s.page}>
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
        <div className={s.navbar_right}>USER_PLACEHOLDER</div>
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
                    onClick={(e) => {setOpenLetter(index); setLetterText(coverLetterOption.content)}}
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
              <button className={s.logout_button}>
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
              value={coverLetterOptions[openLetter].content}
              onChange={(e) => setCoverLetterOptions(coverLetterOptions.map((coverLetterOption, index) => {
                if (index === openLetter) {
                  return {
                    ...coverLetterOption,
                    content: e.target.value
                  }
                } else {
                  return coverLetterOption;
                }
              }))}
            />
          </div>
          <div className={s.content_center_input_container}>
            <input
              type="text"
              placeholder="Additional instructions here"
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
            />

            <button className={loading ? s.loading_button: null} onClick={(e) => generateCoverLetter(e)}>GO!</button>
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
              Nothing currently attached
            </div>
            <label className={s.upload_resume_button}>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => console.log("get this done!")}
              />
              Upload CV
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
