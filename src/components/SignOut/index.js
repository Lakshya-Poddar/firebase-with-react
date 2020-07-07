import React,{useContext} from 'react'
import {FirebaseContext} from '../Firebase'
function SignOut() {
    const firebase = useContext(FirebaseContext)
    return (
        <div>
            <button onClick={firebase.doSignOut}>SignOut</button>
        </div>
    )
}

export default SignOut
