import React from 'react'
import {query,onSnapshot,where, orderBy} from 'firebase/firestore'
import {auth} from '../firebase-config.jsx' 
import {useEffect } from "react";

import Myrooms from './Myrooms.jsx'
import Chat from './Chat.jsx';
import Signout from './Signout.jsx';



export default function(props){
    const {roomsRef,roomNames}=props
    const chat=document.querySelector('#chat');
    const chatRooms=document.querySelector('#chat-rooms');
    useEffect(()=>{
        console.log("useState running")
        auth.onAuthStateChanged(user=>{
            if(user)
            {
                const queryRoom=query(roomsRef,where("adminId","==",auth.currentUser.uid),orderBy("roomName"))
                const unsubscribe =onSnapshot(queryRoom,(snapshot)=>
                {
                let Rooms=[];
                snapshot.forEach((doc)=>
                {
                    Rooms.push({...doc.data(), id:doc.id})
                })
                props.setMyRooms(Rooms)
                roomNames.current=Rooms.map(room =>{
                    return room.roomName})
                })
                console.log("updated myRooms")
                console.log(props.myRooms,roomNames.current)
                return ()=> unsubscribe()
            }
            else{
                console.log("Couldn't find user")
            }
        })
    },[])


    return(
        <div className="chat-container">
            <Myrooms 
                room={props.room}
                myRooms={props.myRooms}
                setRoom={props.setRoom}
                chat={chat}
                chatRooms={chatRooms}
                newRoom={props.newRoom}
                setNewRoom={props.setNewRoom}
            />
            {
                
                <Chat
                room={props.room}
                isAuth={props.isAuth}
                signOutUser={props.signOutUser}
                newRoom={props.newRoom}
                />
            }
            
        </div>
    )
}