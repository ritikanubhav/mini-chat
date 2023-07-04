import {auth} from '../firebase-config.jsx' 
import {BsPeopleFill } from "react-icons/bs";
import '../assets/styles/Myrooms.css'
export default function Myrooms(props){
    const {room,myRooms,chat,chatRooms}=props

    return(
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
    )
}