'use client'
import React from 'react'
import s from './page.module.scss'
import { useState } from 'react'

type Movie = string;

const current_movies: Movie[] = [];

function Page() {

  const [addMovie, setAddMovie] = useState("")
  const [rerenderHack, setRerenderHack] = useState(false)
  const [email, setEmail] = useState("")

  function addMovieToList() {
      const addMovieWithoutSpaces = addMovie.replace(/\s/g, '')
      if (addMovieWithoutSpaces !== "") {
        current_movies.push(addMovie)
        setAddMovie("")
      }
  }

  function submitList() {
    if (current_movies.length === 0) {
      alert("Please add a movie to the list")
      return
    }
    if (email === "") {
      alert("Please enter an email address")
      return
    }

    
    current_movies.length = 0;
    console.log("submitted")
    setRerenderHack(!rerenderHack)
  }

  function deleteItem(movie: Movie) {
    console.log(movie)
    current_movies.splice(current_movies.indexOf(movie), 1)    
    console.log("deleted")
    setRerenderHack(!rerenderHack)
  }

  return (
    <div className={s.home}>
      <div className={s.navbar} >
        <img src='/ferrett.png' />
        <h2>StreamScout</h2>
      </div>
      <div className={s.content} >
        <div className={s.searchbox_container}>
          <input className={s.searchbox} type='text' value={addMovie} onChange={(e) => setAddMovie(e.target.value)} 
          onKeyDown={(e) => { if (e.keyCode === 13) { addMovieToList()}}} placeholder='Add a movie to the list' />
          <button className={s.addbutton} type='submit' onClick={() => addMovieToList()}>+</button>
        </div>
      </div>

        <div className={s.searchresults}>
            {current_movies.map((movie, index) => (
              <div className={s.movie_element} key={index}>{movie}<img className={s.tiny_x} src='/tiny_x.svg' onClick={() => deleteItem(movie)}/></div>
            ))}
        </div>

      <div className={s.email_and_submit}>
        <input className={s.emailbox} type='text' value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => { if (e.keyCode === 13) { submitList()}}} placeholder='email to send results to' />
        <button className={s.submitbutton} type='submit' onClick={() => submitList()}>send now</button>
      </div>
    </div>
  )
}

export default Page