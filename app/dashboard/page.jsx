"use client";
import React from "react";

import s from "./dashboard.module.scss";
import { useState } from "react";

import pdfjsLib from "pdfjs-dist";

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
  const [resumePdf, setResumePdf] = useState("");
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

  const pdfUpload = (e) => {
    function extractTextFromPDF(pdfFile) {
      // Load the PDF file as an array buffer
      pdfjsLib.getDocument(url).promise.then(function (pdf) {
        return pdfjsLib
          .getDocument({ data: pdfFile })
          .promise.then(function (pdf) {
            // Get the number of pages in the PDF
            var numPages = pdf.numPages;

            // Initialize an array to hold the text for each page
            var pagesText = [];

            // Loop through each page of the PDF
            for (var i = 1; i <= numPages; i++) {
              // Get the page object
              var page = pdf.getPage(i);

              // Get the text content of the page using a Promise
              pagesText.push(
                page.getTextContent().then(function (textContent) {
                  // Combine the text items into a single string
                  return textContent.items
                    .map(function (item) {
                      return item.str;
                    })
                    .join("");
                })
              );
            }

            // Wait for all pages to be processed
            return Promise.all(pagesText);
          })
          .then(function (pagesText) {
            // Combine the text from all pages into a single string
            return pagesText.join("\n");
          });
        // Your code here
      });
    }

    // Usage example
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        const pdfFile = e.target.result;
        extractTextFromPDF(pdfFile).then(function (text) {
          console.log(text);
        });
      };
      fileReader.readAsArrayBuffer(file);
    }
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
                  >
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

            <button onClick={(e) => generateCoverLetter(e)}>GO!</button>
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
                onChange={(e) => pdfUpload(e)}
              />
              Upload CV
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
