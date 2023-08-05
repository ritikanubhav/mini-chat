import React from 'react'
import {useState,useEffect,useRef} from 'react'
import Auth from './components/Auth.jsx'
import Navbar from './components/Navbar.jsx'
import ChatContainer from './components/ChatContainer.jsx'
import Cookie from 'universal-cookie'
import {db,auth} from './firebase-config.jsx'
import { signOut } from 'firebase/auth'
import './App.css'
import NewRoom from './components/NewRoom.jsx'
import {collection} from 'firebase/firestore'

const cookie= new Cookie()
export default function App() {
  const [isAuth,setIsAuth]=useState(cookie.get('auth-token'))
  const [room,setRoom]=useState(null)
  const [myRooms,setMyRooms]=useState([])
  const [newRoom,setNewRoom]=useState(false);
  const roomsRef=collection(db,"allRooms")
  const roomNames=useRef([])
  let style
  useEffect(()=>{
    newRoom ?
      style={display:'block'}:
      style={display:'none'}
  },[newRoom])
  
  async function signOutUser(){
    console.log('Signing out user')
    await signOut(auth);
    cookie.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }
  // console.log("this is room",room)
  // console.log(newRoom)
  if(!isAuth)
  {
    console.log(typeof(newRoom))
    return (
      <div className='app'>
        <Navbar
          isAuth={isAuth}
          signOutUser={signOutUser}
          newRoom={newRoom}
          setNewRoom={setNewRoom}
          style={style}
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
      {
        newRoom ?
        <>
        <Navbar
          isAuth={isAuth}
          signOutUser={signOutUser}
          newRoom={newRoom}
          setNewRoom={setNewRoom}
          style={style}
          />
        <div className='main mainWithNavbar'>
          <NewRoom 
            room={room}
            setRoom={setRoom}
            myRooms={myRooms}
            setMyRooms={setMyRooms}
            newRoom={newRoom}
            setNewRoom={setNewRoom}
            roomsRef={roomsRef}
            roomNames={roomNames}
          />
        </div> 
        </>
        :
        <div className='main mainWithoutNavbar'>
            <ChatContainer
              room={room}
              isAuth={isAuth}
              signOutUser={signOutUser}
              setRoom={setRoom}
              myRooms={myRooms}
              setMyRooms={setMyRooms}
              newRoom={newRoom}
              setNewRoom={setNewRoom}
              roomsRef={roomsRef}
              roomNames={roomNames}
            />
        </div>
      }
    </div>
  )
}

