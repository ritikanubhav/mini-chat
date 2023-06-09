import {auth,provider} from '../firebase-config.jsx'
import {signInWithPopup} from 'firebase/auth'
import Cookie from 'universal-cookie'
import { FcGoogle} from "react-icons/fc";
import '../assets/styles/auth.css'
const cookie=new Cookie()
export default function Auth(props){

    async function signIn(){
        try{
        const result= await signInWithPopup(auth,provider)
        console.log(result.user);
        cookie.set('auth-token',result.user.refreshToken)
        props.setIsAuth(true)
        }
        catch(err)
        {console.log(err)}
    }
    return(
        <div className='auth'>
            <button className="signIn" onClick={signIn}><FcGoogle style={{fontSize:"25px"}}/> SIGN IN WITH GOOGLE</button>
        </div>
    )
}