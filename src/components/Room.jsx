import { useRef,useEffect } from "react";
import {db,auth} from '../firebase-config.jsx' 
import {addDoc,collection,serverTimestamp,query,onSnapshot,where, orderBy} from 'firebase/firestore'
import '../assets/styles/room.css'
export default function(props){
    const {setRoom,myRooms,setMyRooms}=props
    const roomInput=useRef(null)
    const roomsRef=collection(db,"allRooms")
    const roomNames=useRef([])
    // console.log(auth.currentUser.uid)
    
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
                setMyRooms(Rooms)
                roomNames.current=Rooms.map(room =>{
                    return room.roomName})
                })
                console.log("updated myRooms")
                console.log(myRooms,roomNames.current)
                return ()=> unsubscribe()
            }
            else{
                console.log("Couldn't find user")
            }
        })
    },[])
    
    // console.log("outside useEffect",myRooms,roomNames.current)  
    
    async function newRoomHandler(e){
        e.preventDefault();
        const roomValue=roomInput.current.value
        // console.log(myRooms,roomNames)
        //matching with word starting with whiespace char or end with
        if(roomValue === null||roomValue.match(/(^\s)|(\s$)/)) 
        {
            alert("Empty value or a whitespace character in beginning or end, Please Enter something valid.");
            return;
        }
        if(roomNames.current.includes(roomValue)) {
            console.log("Room already exists")
            // alert("Room already exists.Please enter another room or you can join this room")
        }
        else{
            await addDoc(roomsRef,{
                roomName:roomValue,
                createdAt: serverTimestamp(),
                adminId:auth.currentUser.uid,
                membersId:[auth.currentUser.uid],
                admin: auth.currentUser.displayName,
                adminImageUrl: auth.currentUser.photoURL,
            })
            // setMyRooms((oldArray)=>[...oldArray,roomValue])
            // console.log("Room didnt exists",myRooms)
         }
        setRoom(roomValue)
    }
    return(
        <form className='room' onSubmit={newRoomHandler}>
            <label htmlFor="room">Enter Room Name:</label>
            <input id="room" autoFocus type="text" ref={roomInput} placeholder="Room Name"/>
            <button className='roombtn' type='submit'>Enter Chat</button>
            <p className="disclaimer">NOTE: If room exists you will enter the chat of that room else a new room will be created.</p>
        </form>
    )
}