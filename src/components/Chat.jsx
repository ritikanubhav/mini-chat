import React from 'react'
import Signout from "./Signout"
import { BsArrowLeft} from "react-icons/bs"
import { MdSend } from "react-icons/md"
// useState and all import
import { useState,useEffect } from "react";
// firebase auth db and all import
import {db,auth} from '../firebase-config.jsx' 
import {addDoc,collection,serverTimestamp,query,onSnapshot,where, orderBy} from 'firebase/firestore'
// icons import
import '../assets/styles/chat.css'

export default function Chat(props){

    const [newMessage,setNewMessage]=useState("")
    const [messages,setMessages]=useState([])
    const messageRef=collection(db,"messages")

    //CREATING MESSAGES ARRAY FOR DISPLAYING MESSAGES IN CHAT CONTAINER -->
    useEffect(()=>{
        const queryMessage=query(messageRef,where("room","==",props.room),orderBy("createdAt"))
        // orderBy will work only if we create index in firebase/firestore console in query-builder for other than room in where
        const unsubscribe =onSnapshot(queryMessage,(snapshot)=>{
            let messages=[];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id:doc.id})
            })
            setMessages(messages)
        })
        console.log("useffect run for messages",messages)
        return ()=> unsubscribe()
    },[props.room,newMessage])

    // PINNING SCROLL TO BOTTOM ON ANY CHANGE IN MESSAGE ARRAY
    // that is sending or receiving of message although deleting a message will also do the same -->
    useEffect(()=>{
        const scrollElement=document.getElementById('scroller')
        scrollElement.scrollTop = scrollElement.scrollHeight;
    },[messages])

    // MESSAGE FORM SUBMISSION AND SENDING TO DATABASE
    async function handleSubmit(e){
        e.preventDefault();
        if(newMessage === "")return
        await addDoc(messageRef,{
            text : newMessage,
            createdAt: serverTimestamp(),
            uid:auth.currentUser.uid,
            user: auth.currentUser.displayName,
            imageUrl: auth.currentUser.photoURL,
            room:props.room,
        })
        setNewMessage("")
    }

    // FOR DISPLAYING IN MOBILE DEVICES: CHAT AND MYROOMS SELCTORS-->
    const chat=document.querySelector('#chat');
    const chatRooms=document.querySelector('#chat-rooms');

    // GO BACK TO MY ROOMS SECTION IN MOBILE DEVICES ON CLICKING ARROW
    function arrowClickHandler()
    {
        // console.log("clicked",chat,chatRooms)
        props.setRoom(null);
        chat.style.display="none";
        chatRooms.style.display="block";
        chatRooms.style.width="100%"   
    }

    return(
        <div className="chat" id="chat">
            <div className="chat-header">
                <div className="chat-header-left">
                    <span className="arrow" id="arrow" onClick={arrowClickHandler}><BsArrowLeft style={{fontSize:"25px"}}/></span>
                    {props.room && <h1>{props.room.toUpperCase()}</h1>}
                </div>
                <Signout
                    isAuth={props.isAuth}
                    signOutUser={props.signOutUser}
                />
            </div>
            
            <div id='scroller' className="message-box">
                {messages.map( (message) => (
                    <div className="single-message" 

                        style={message.uid===auth.currentUser.uid ?
                            {marginLeft:"auto",borderBottomRightRadius:"0px"}
                            :{marginRight:"auto",background:'#C2DEDC',borderBottomLeftRadius:"0px"}}>

                        <div className="user">
                            <img className="userImg" src={message.imageUrl}/>
                            <span className="username">~ {message.user}</span>
                        </div>
                        <div className="text">
                            { message.text }
                        </div>
                        {/* <div className="msg_time" style={{float:"right"}}>
                        {message.createdAt.toDate().toString().split(" ")[4]}
                        </div> */}
                    </div>)
                )}
            </div>
            {props.room &&
            <form className='msgform' onSubmit={handleSubmit}>
                <input placeholder="Type Your Message here..."
                    onChange={(e)=>{setNewMessage(e.target.value)}}
                    value={newMessage}
                    className="msginput"
                />
                <button type='submit' style={{width:"2.6rem",height:"2.6rem"}}>
                    <MdSend style={{
                        height:"30px",
                        width:"20px"}}/>
                </button>
            </form>}
        </div>
    )
}