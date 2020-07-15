import React, { useContext,Component } from "react";
import PasswordForgetPage from "../PasswordForget";
import {FirebaseContext} from '../Firebase'
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";

const AccountPage = () => {
  var { authUser } = useContext(AuthUserContext);
  var firebase =useContext(FirebaseContext)
  var email = authUser ? authUser.email : "";
  return (
    <div>
      <h1>Account:{email}</h1>
      <p>{}</p>
      <PasswordForgetPage />
      <PasswordChangeForm />
      <LoginManagement authUser={authUser} firebase={firebase}/>
    </div>
  );
};


class LoginManagement extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       activeSignInMethods:[],
       error:null,
       
    }
  }
  
  render()
  {
    return(

    
      <div>
        Sing IN Methods:
        <ul>
          {
            SIGN_IN_METHODS.map(signInMethod=>{
              return(
                <li key={signInMethod.id}>
                  <button type="button" onClick={()=>{}}>{signInMethod.id}</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const SIGN_IN_METHODS = [
  {
    id: "password",
    provider: null,
  },
  {
    id: "google.com",
    provider: "googleProvider",
  },
  {
    id: "facebook.com",
    provider: "facebookProvider",
  },
  {
    id: "twitter.com",
    provider: "twitterProvider",
  },
];

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(AccountPage);
