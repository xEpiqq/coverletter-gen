import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./CreateCLForm.module.scss";

export default function CreateCLForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [cv, setCv] = useState("");
  const [creativityLevel, setCreativityLevel] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("here1");

    // send to the createCoverLetter api
    const data = {
      title,
      description,
      company,
      location,
      cv_pdf: cv,
      creativityLevel,
    };
    console.log(cv);
    const res = await fetch("/api/createCoverLetter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("here");

    const json = await res.json();
    if (!res.ok) throw Error(json.message);

    setCoverLetter(json.data);
    setShowCoverLetter(true);
  };

  return (
    <div>
      {showCoverLetter && (
        <div className={styles.cover_letter}>
          <h1 className={styles.cover_letter_title}>Cover Letter</h1>
          <p className={styles.cover_letter_text}>{coverLetter}</p>
        </div>
      )}
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h1 className={styles.form_title}>Job Details</h1>
        <div className={styles.form_input_container}>
          <input
            className={styles.form_input}
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
          />

          <input
            className={styles.form_input}
            type="text"
            id="company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company Name"
          />

          <input
            className={styles.form_input}
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Job Location"
          />

          <textarea
            className={styles.form_input_text}
            id="jobDescription"
            name="jobDescription"
            rows="10"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
          ></textarea>
          <div className={styles.form_input_file}>
            <label className={styles.form_input_file_label}>
              <input
                type="file"
                id="cv"
                name="cv"
                value={cv}
                onChange={(e) => setCv(e.target.value)}
                placeholder="Upload CV"
                accept="application/pdf"
              />
              <p>Upload CV</p>
            </label>
            Upload a PDF only of Your CV/Resumé
          </div>
        </div>
        <input className={styles.submit_button} type="submit" value="Submit" />
      </form>
    </div>
  );
}
