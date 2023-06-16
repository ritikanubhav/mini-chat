import Signout from './Signout.jsx'
import { useState,useEffect } from "react";
import {db,auth} from '../firebase-config.jsx' 
import {addDoc,collection,serverTimestamp,query,onSnapshot,where, orderBy} from 'firebase/firestore'
import { BsArrowLeft,BsPeopleFill } from "react-icons/bs";
import '../assets/styles/chat.css'
export default function(props){
    const {room,myRooms}=props
    const [newMessage,setNewMessage]=useState("")
    const [messages,setMessages]=useState([])
    const messageRef=collection(db,"messages")
    
    useEffect(()=>{
        const queryMessage=query(messageRef,where("room","==",room),orderBy("createdAt"))
        // orderBy will work only if we create index in firebase/firestore console in query-builder 
        // through the link provided ,when trying to use orderby for field different  from field in where clause
        const unsubscribe =onSnapshot(queryMessage,(snapshot)=>{
            let messages=[];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id:doc.id})
            })
            setMessages(messages)
        })
        console.log("useffect run for messages",messages)
        return ()=> unsubscribe()
    },[room,newMessage])

    // on changing message array that is sending or receiving of message
    // pinning scroll to bottom although deleting a message will also do the same -->
    useEffect(()=>{
        const scrollElement=document.getElementById('scroller')
        scrollElement.scrollTop = scrollElement.scrollHeight;
    },[messages])


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
        // pinning scrollbar to bottom on sending new message but not works on receiving if put here
        // const scrollElement=document.getElementById('scroller')
        // scrollElement.scrollTop = scrollElement.scrollHeight;
    }
    const chat=document.querySelector('#chat');
    const chatRooms=document.querySelector('#chat-rooms');
    
    function arrowClickHandler()
    {
        console.log("clicked")
        chat.style.display="none";
        chatRooms.style.display="block";
        chatRooms.style.width="100%"   
    }

    return(
        <div className="chat-container">
            <div className="chat-rooms" id='chat-rooms'>
                <div className="chat-header">
                    <img className="profileImg" src={auth.currentUser.photoURL}/>
                    <h1>MY ROOMS</h1>
                    <button onClick={()=>{props.setRoom(null)}}>New Room</button>
                </div>
                <div className="rooms-container">
                    {
                        myRooms.map((roomValue)=>(
                            <div className='single-room' onClick={()=>{
                                props.setRoom(roomValue.roomName)
                                console.log("room clicked",room)
                                if(chat.style.display==="none")
                                {
                                    chat.style.display="flex";
                                    console.log("chat reset")
                                }
                                if(chatRooms.style.width==="100%")
                                {
                                    chatRooms.style.display="none"
                                    console.log("chatRooms reset")
                                }   
                            }}>
                                <div className='room-info'>
                                    <BsPeopleFill style={{
                                        color:"#526D82",
                                        height:"35px",
                                        width:"35px",
                                        border:"solid 2px #526D82",
                                        borderRadius:"50%"
                                    }}/>
                                    <h4>{roomValue.roomName}</h4>
                                </div>
                    
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="chat" id="chat">
                <div className="chat-header">
                    <div className="chat-header-left">
                        <span className="arrow" id="arrow" onClick={arrowClickHandler}><BsArrowLeft style={{fontSize:"25px"}}/></span>
                        <h1 >{props.room.toUpperCase()}</h1>
                    </div>
                    <Signout
                        isAuth={props.isAuth}
                        signOutUser={props.signOutUser}
                    />
                </div>
                <div id='scroller' className="message-box">
                    {messages.map( (message) => (
                        <div className="single-message" 
                            style={message.uid===auth.currentUser.uid ?{float:"right"}:{float:"left",background:'#C2DEDC'}}>
                            <div className="user">
                                <img className="userImg" src={message.imageUrl}/>
                                <span className="username">~ {message.user}</span>
                            </div>
                            <div className="text">
                                { message.text }
                            </div>
                        </div>)
                    )}
                </div>
                <form className='msgform' onSubmit={handleSubmit}>
                    <input autoFocus placeholder="Type Your Message here..."
                        onChange={(e)=>{setNewMessage(e.target.value)}}
                        value={newMessage}
                        className="msginput"
                    />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}