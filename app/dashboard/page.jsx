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
      </div>
    </div>
  );
}
