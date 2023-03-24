"use client";
import React from "react";

import s from "./dashboard.module.scss";
import { useState } from "react";

export default function Dashboard() {
  const [openLetter, setOpenLetter] = useState(false);
  const [coverLetterOptions, setCoverLetterOptions] = useState([
    "My First Cover Letter",
    "My Second Cover Letter",
    "My Third Cover Letter",
  ]);
  const [additionalInstructions, setAdditionalInstructions] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [creativityMeter, setCreativityMeter] = useState(0);
  const [letterText, setLetterText] = useState("");

  const uploadResume = (e) => {
    // TODO: Upload resume to database
  };

  const createCoverLetter = (e) => {
    setCoverLetterOptions([...coverLetterOptions, "New Cover Letter"]);
  };

  const generateCoverLetter = (e) => {
    // TODO: Generate cover letter
  };

  return (
    <div className={s.page}>
      <div className={s.navbar}>
        <div className={s.navbar_left}>
          <img src="/logo_green.svg" alt="logo" />
        </div>
        <div className={s.navbar_center}>
          <img src="/double_arrow_left.svg" alt="logo" />
          <h1>COVER LETTER GENERATOR</h1>
          <img src="/double_arrow_right.svg" alt="logo" />
        </div>
        <div className={s.navbar_right}>USER_PLACEHOLDER</div>
      </div>
      <div className={s.content}>
        <div className={s.content_left}>
          <div className={s.content_left_top}>
            <button
              className={s.new_cover_letter_button}
              onClick={(e) => createCoverLetter(e)}
            >
              {"+ New Cover Letter"}
            </button>
          </div>
          <div className={s.content_left_middle}>
            <div className={s.cover_letter_selector_container}>
              {/* Map the values into buttons */}
              {coverLetterOptions.map((coverLetterOption) => {
                return (
                  <button className={s.cover_letter_selector_button}>
                    <img src="/cover_letter_button_icon.svg" alt="logo" />
                    {coverLetterOption}
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
              className={s.content_center_textbox_input}
              type="text"
              placeholder=""
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
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
              className={s.content_center_button}
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
            <input id="Job input" className={s.content_right_input} />
          </div>
          <div className={s.input_container}>
            <label htmlFor="Company input">Company</label>
            <input id="Company input" className={s.content_right_input} />
          </div>
          <div className={s.input_container}>
            <label htmlFor="Location input">Location</label>
            <input id="Location input" className={s.content_right_input} />
          </div>
          <div className={s.input_container_big}>
            <label id="Job Description input">
              Paste the job description here
            </label>
            <textarea
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
              class="slider"
              id="Creativity input"
              onChange={(e) => setCreativityMeter(e.target.value)}
            />
            <div className={s.content_right_meter} />
          </div>
          <div className={s.content_right_bottom}>
            <div className={s.nothing_attached_text}>
              Nothing currently attached
            </div>
            <label className={s.upload_resume_button}>
              <input type="file" />
              <p>Upload CV</p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
