import '../assets/styles/navbar.css'
import Signout from './Signout.jsx'

export default function Navbar(props){
    console.log(  typeof(props.newRoom))

    return(
        <div className="navbar"  style={props.style}>
            <h1>ChatBucks</h1>
            {
                !props.room && <Signout isAuth={props.isAuth} signOutUser={props.signOutUser} setNewRoom={props.setNewRoom}/>
            }
        </div>
    )
}