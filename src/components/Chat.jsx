import Signout from './Signout.jsx'
import { useState,useEffect } from "react";
import {db,auth} from '../firebase-config.jsx' 
import {addDoc,collection,serverTimestamp,query,onSnapshot,where, orderBy} from 'firebase/firestore'
import '../assets/styles/chat.css'
export default function(props){
    const [newMessage,setNewMessage]=useState("")
    const [messages,setMessages]=useState([])
    const messageRef=collection(db,"messages")
    // console.log(messages)

    useEffect(()=>{
        const queryMessage=query(messageRef,where("room","==",props.room),orderBy("createdAt"))
        // orderBy will work only if we create index in firebase/firestore console in query-builder 
        // through link provided when trying to use orderby for diff field from where clause
        const unsubscribe =onSnapshot(queryMessage,(snapshot)=>{
            let messages=[];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id:doc.id})
            })
            setMessages(messages)
        })
        return ()=> unsubscribe()
    },[])

    // on changing message array that is sending or receiving of message
    // pinning scroll to bottom although deleting a message will also do the same

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

    return(
        <div className="chat-container">
            <div className="chat-rooms">
                <div className="chat-header">
                    <img className="profileImg" src={auth.currentUser.photoURL}/>
                    <h1>MY ROOMS</h1>
                    <button onClick={()=>props.setRoom(null)}>New Room</button>
                </div>
                <div className="rooms-list">
                    Room1
                    Room2
                    Room3....
                </div>
            </div>
            <div className="chat">
                <div className="chat-header">
                    <h1 >WELCOME TO {props.room.toUpperCase()}</h1>
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