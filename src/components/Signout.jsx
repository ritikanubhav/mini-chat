export default function(props){
    return(
        <div>
            {props.isAuth && <button className='signout-btn' onClick={async()=>{await props.signOutUser();props.setNewRoom(false)}}>SIGN OUT</button> }
        </div>
    )
}


