import {useRef} from 'react'

export default function(props){
    const roomInput=useRef(null)
    return(
        <div>
            <label htmlFor="room">ENTER ROOM NAME </label>
            <input id="room" type="text" ref={roomInput} placeholder="Room Name"/>
            <button onClick={()=>{props.setRoom(roomInput.current.value)}}>enter chat</button>
        </div>
    )
}