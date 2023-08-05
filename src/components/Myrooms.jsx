import {auth} from '../firebase-config.jsx' 
import {BsPeopleFill } from "react-icons/bs";
import '../assets/styles/Myrooms.css'
export default function Myrooms(props){
    const {room,myRooms,setRoom,setNewRoom}=props
    const chat=document.querySelector('#chat');
    const chatRooms=document.querySelector('#chat-rooms');
    var mobileScreen = window.matchMedia("(max-width: 495px)")   
    return(
        <div className="chat-rooms" id='chat-rooms'>
                <div className="chat-header">
                    <img className="profileImg" src={auth.currentUser && auth.currentUser.photoURL}/>
                    <h1>MY ROOMS</h1>
                    <button onClick={async ()=>{await setRoom(null); setNewRoom(true)}}>New Room</button>
                </div>
                <div className="rooms-container">
                    {
                        myRooms.map((roomValue)=>(
                            <div className='single-room' onClick={()=>{
                                props.setRoom(roomValue.roomName)
                                console.log("room clicked",room)
                                console.log(chat.style.display,chatRooms.style)
                                if(mobileScreen.matches)
                                {
                                    chat.style.display="flex";
                                    console.log("chat reset",chat)
                                    chatRooms.style.display="none"
                                    console.log("chatRooms reset",chatRooms)
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
    )
}