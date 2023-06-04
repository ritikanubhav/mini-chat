import React from 'react'
import {useState} from 'react'
import Auth from './components/Auth.jsx'
import Room from './components/Room.jsx'
import Chat from './components/Chat.jsx'
import Cookie from 'universal-cookie'
const cookie= new Cookie()
export default function App() {
  const [isAuth,setIsAuth]=useState(cookie.get('auth-token'))
  const [room,setRoom]=useState(null)
  if(!isAuth)
  {
    return (
      <div>
        <Auth 
          setIsAuth={setIsAuth}
        />
      </div>
    )
  }
  return(
    <div>
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
    </div>
  )
}

