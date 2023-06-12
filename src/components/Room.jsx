import {useRef} from 'react'
import '../assets/styles/room.css'
export default function(props){
    const roomInput=useRef(null)
    return(
        <form className='room' onSubmit={
        (e)=>
        {   e.preventDefault();
            props.setRoom(roomInput.current.value);
        }}>
            <label htmlFor="room">Type room name:</label>
            <input id="room" autoFocus type="text" ref={roomInput} placeholder="Room Name"/>
            <button className='roombtn' type='submit'>Enter Chat</button>
        </form>
    )
}