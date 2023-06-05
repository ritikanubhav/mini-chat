import {useRef} from 'react'
import '../assets/styles/room.css'
export default function(props){
    const roomInput=useRef(null)
    return(
        <div className='room container'>
            <label htmlFor="room">Type room name:</label>
            <input id="room" type="text" ref={roomInput} placeholder="Room Name"/>
            <button className='roombtn' onClick={()=>{props.setRoom(roomInput.current.value)}}>Enter Chat</button>
        </div>
    )
}