"use client";
import React from "react";
import s from "./page.module.scss";
import { useState } from "react";

type Movie = string;

import CreateClForm from "./component/CreateClForm";

// import link from next
import Link from "next/link";

const current_movies: Movie[] = [];

function Page() {
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

  function deleteItem(movie: Movie) {
    console.log(movie);
    current_movies.splice(current_movies.indexOf(movie), 1);
    console.log("deleted");
    setRerenderHack(!rerenderHack);
  }

  return (
    <div className={s.home}>
      <div className={s.navbar}>
        <div className={s.logo}>
          <img src="/ferrett.png" />
          <h2>GptCoverLetter</h2>
        </div>
        <Link href="/login">Login</Link>
      </div>
      <CreateClForm />
      <div className={s.bottom_text}>
        <p>Thank you for using GptCoverLetter!</p>
        <p>Good luck!</p>
      </div>
    </div>
  );
}

export default Page;
