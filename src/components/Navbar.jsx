import '../assets/styles/navbar.css'
import Signout from './Signout.jsx'

export default function Navbar(props){
    return(
        <div className="navbar" style={props.room && {display:"none"}}>
            <h1>CHATBUCKS</h1>
            {
                !props.room && <Signout isAuth={props.isAuth}/>
            }
        </div>
    )
}