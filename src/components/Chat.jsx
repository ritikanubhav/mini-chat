import { useState,useEffect } from "react";
import {db,auth} from '../firebase-config.jsx' 
import {addDoc,collection,serverTimestamp,query,onSnapshot,where} from 'firebase/firestore'
export default function(props){
    const [newMessage,setNewMessage]=useState("")
    const [messages,setMessages]=useState([])
    const messageRef=collection(db,"messages")
    console.log(messages)
    useEffect(()=>{
        const queryMessage=query(messageRef,where("room","==",props.room))
        const unsubscribe =onSnapshot(queryMessage,(snapshot)=>{
            let messages=[];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id:doc.id})
            })
            setMessages(messages)
        })
        return ()=> unsubscribe()
    },[])

    async function handleSubmit(e){
        e.preventDefault();
        if(newMessage === "")return
        await addDoc(messageRef,{
            text : newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room:props.room,
        })
        setNewMessage("")
    }
    return(
        <div>
            <h1>Room:{props.room}</h1>
            <div>
            {messages.map( (message) => <h1> { message.text }</h1>)}
            </div>
            <form onSubmit={handleSubmit}>
            <input placeholder="Type Your Message here..."
                onChange={(e)=>{setNewMessage(e.target.value)}}
                value={newMessage}
            />
            <button type='submit'>Send</button>
            </form>
        </div>
    )
}