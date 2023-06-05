import React from 'react'
import {useState} from 'react'
import Auth from './components/Auth.jsx'
import Room from './components/Room.jsx'
import Navbar from './components/Navbar.jsx'
import Chat from './components/Chat.jsx'
import Cookie from 'universal-cookie'
import {auth} from './firebase-config.jsx'
import { signOut } from 'firebase/auth'
import './App.css'
const cookie= new Cookie()
export default function App() {
  const [isAuth,setIsAuth]=useState(cookie.get('auth-token'))
  const [room,setRoom]=useState(null)

  async function signOutUser(){
    await signOut(auth);
    cookie.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }

  if(!isAuth)
  {
    return (
      <div className='app'>
        <Navbar/>
        <Auth 
          setIsAuth={setIsAuth}
        />
      </div>
    )
  }
  return(
    <div className='app'>
    <Navbar/>
    {
      room ?
        <Chat 
          room={room}
        />
      :
      <Room 
        setRoom={setRoom}
      />
    }

    <button onClick={signOutUser}>SIGN OUT</button>
    </div>
  )
}

