import { useRef} from "react";
import {auth} from '../firebase-config.jsx' 
import {addDoc,serverTimestamp} from 'firebase/firestore'
import '../assets/styles/NewRoom.css'
export default function(props){
    const {setRoom,setNewRoom}=props
    const roomInput=useRef(null)

    async function newRoomHandler(e){
        e.preventDefault();
        const roomValue=roomInput.current.value
        console.log(roomValue)
        //matching with word starting with whiespace char or end with
        if(roomValue === ''||roomValue.match(/(^\s)|(\s$)/)) 
        {
            alert("Empty value or a whitespace character in beginning or end, Please Enter something valid.");
            console.log(roomValue);
            return;
        }
        if(props.roomNames.current.includes(roomValue)) {
            console.log("Room already exists")
            // alert("Room already exists.Please enter another room or you can join this room")
        }
        else{
            await addDoc(props.roomsRef,{
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
        await setRoom(roomValue)
        setNewRoom(false);
    }
    return(
        <form className='room' onSubmit={newRoomHandler}>
            <label htmlFor="room">Enter Room Name:</label>
            <input id="room" autoFocus type="text" ref={roomInput} placeholder="Room Name"/>
            <button className='roombtn' type='submit'>Create Room</button>
            <button className='roombtn' type='button' onClick={()=>{setNewRoom(false)}}>My Rooms</button>
            <p className="disclaimer">NOTE: If room exists you will enter the chat of that room else a new room will be created.</p>
        </form>
    )
}