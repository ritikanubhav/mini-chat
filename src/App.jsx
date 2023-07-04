import React from 'react'
import {useState,useEffect} from 'react'
import Auth from './components/Auth.jsx'
import Room from './components/NewRoom.jsx'
import Navbar from './components/Navbar.jsx'
import Chat from './components/Chat.jsx'
import Cookie from 'universal-cookie'
import {auth} from './firebase-config.jsx'
import { signOut } from 'firebase/auth'
import './App.css'
import NewRoom from './components/NewRoom.jsx'
const cookie= new Cookie()
export default function App() {
  const [isAuth,setIsAuth]=useState(cookie.get('auth-token'))
  const [room,setRoom]=useState(null)
  const [myRooms,setMyRooms]=useState([])

  async function signOutUser(){
    console.log('Signing out user')
    await signOut(auth);
    cookie.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }
  console.log("this is room",room)
  if(!isAuth)
  {
    return (
      <div className='app'>
        <Navbar
          isAuth={isAuth}
          signOutUser={signOutUser}
          room={room}
        />
        <div className='main mainWithNavbar'>
          <Auth 
            setIsAuth={setIsAuth}
          />
        </div>
      </div>
    )
  }
  
  return(
    <div className='app'>
      <Navbar
        isAuth={isAuth}
        signOutUser={signOutUser}
        room={room}
      />
      {
        room ?
        <div className='main mainWithoutNavbar'>
          <Chat 
            room={room}
            isAuth={isAuth}
            signOutUser={signOutUser}
            setRoom={setRoom}
            myRooms={myRooms}
            setMyRooms={setMyRooms}
          />
        </div> 
        :
        <div className='main mainWithNavbar'>
          <NewRoom 
            room={room}
            setRoom={setRoom}
            myRooms={myRooms}
            setMyRooms={setMyRooms}
          />
        </div>
      }
    </div>
  )
}

