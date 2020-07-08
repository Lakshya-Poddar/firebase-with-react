import React,{useContext} from "react";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization} from '../Session'
import {AuthUserContext} from '../Session'

const AccountPage=()=> {
  var {authUser} =useContext(AuthUserContext)
  console.log(authUser)
  return (
    
    <div>
      <h1>Account:{authUser.email}</h1>
      <p>{}</p>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);
