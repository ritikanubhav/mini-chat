import {auth,provider} from '../firebase-config.jsx'
import {signInWithPopup} from 'firebase/auth'
import Cookie from 'universal-cookie'
const cookie=new Cookie()
export default function Auth(props){

    async function signIn(){
        try{
        const result= await signInWithPopup(auth,provider)
        console.log(result);
        cookie.set('auth-token',result.user.refreshToken)
        props.setIsAuth(true)
        }
        catch(err)
        {console.log(err)}
    }
    return(
        <div>
            <p>SIGN IN WITH GOOGLE TO CONTINUE</p>
            <button onClick={signIn}>SIGN IN</button>
        </div>
    )
}