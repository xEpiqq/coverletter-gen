'use client'
import React from 'react'
import s from './page.module.scss'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import CreateCLForm from './component/CreateCLForm'

function Page() {

  const current_movies = []
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

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

  function deleteItem(movie) {
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
        {user ? <h1 style={{marginLeft: "4rem"}}>{user.displayName}</h1> : <h1>Guest</h1>}
        {user ? <img src={user.photoURL} style={{borderRadius: "50rem"}}/> : <h1>Guest</h1>}
                
      </div>
      <CreateCLForm />
    </div>
  )
}

export default Page