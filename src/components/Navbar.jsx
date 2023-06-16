import '../assets/styles/navbar.css'
import Signout from './Signout.jsx'

export default function Navbar(props){
    return(
        <div className="navbar" style={props.room && {display:"none"}}>
            <h1>ChatBucks</h1>
            {
                !props.room && <Signout isAuth={props.isAuth} signOutUser={props.signOutUser}/>
            }
        </div>
    )
}