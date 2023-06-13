export default function(props){
    return(
        <div>
            {props.isAuth && <button className='signout-btn' onClick={props.signOutUser}>SIGN OUT</button> }
        </div>
    )
}


