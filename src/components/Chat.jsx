import { useState,useEffect } from "react";
import {db,auth} from '../firebase-config.jsx' 
import {addDoc,collection,serverTimestamp,query,onSnapshot,where, orderBy} from 'firebase/firestore'
import '../assets/styles/chat.css'
export default function(props){
    const [newMessage,setNewMessage]=useState("")
    const [messages,setMessages]=useState([])
    const messageRef=collection(db,"messages")
    console.log(messages)
    useEffect(()=>{
        // const scrollElement=document.getElementById('scroller')
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
        // scrollElement.scrollTop = scrollElementelement.scrollHeight;
        return ()=> unsubscribe()
    },[])

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
    return(
        <div className="chat-container">
            <div className="chat">
                <div className="room-name"><h1 >WELCOME TO {props.room.toUpperCase()}</h1></div>
                <div id='scroller' className="message-box">
                    {messages.map( (message) => (
                        <div className="single-message" 
                            style={message.uid===auth.currentUser.uid ?{float:"right",background:'#C2DEDC'}:{float:"left"}}>
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