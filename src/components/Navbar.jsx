import '../assets/styles/navbar.css'
export default function Navbar(props){
    return(
        <div className="navbar">
            <h1>CHATBUCKS</h1>
            {props.isAuth && <button className='signout-btn' onClick={props.signOutUser}>SIGN OUT</button> }
        </div>
    )
}