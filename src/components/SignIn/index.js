import React, { Component, useContext } from "react";
import { withRouter } from "react-router-dom";

import { SignUpLink } from "../SignUp";
import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import {PasswordForgetLink} from '../PasswordForget'
const SignInPage = () => {
  const firebase = useContext(FirebaseContext);
  return (
    <div>
      <h1>SignIN</h1>
      <SignInForm firebase={firebase} />
      <SignInGoogle firebase={firebase} />
      <SignInFacebook firebase={firebase}/>
      <SignUpLink />
      <PasswordForgetLink />
    </div>
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  error: "",
};
class SignInFacebookBase extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       error:null
    }
  }
  onSubmit=event=>{
      this.props.firebase
      .doSignInWithFacebook()
      .then((socialAuthUser)=>{
        return this.props.firebase
        .user(socialAuthUser.user.uid)
        .set({
          username:socialAuthUser.additionalUserInfo.profile.name,
          email:socialAuthUser.additionalUserInfo.profile.email,
          roles:{'ADMIN':null}
        })
      })
      .then(()=>{
        this.setState({error:null});
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error=>{
        this.setState({error});
      })
      event.preventDefault();
  }
  render(){
    const {error}= this.state;
    return(
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In With Facebook</button>
        {error&&<p>{error.message}</p>}
      </form>
    )
  }
  

}
const SignInFacebook=withRouter(SignInFacebookBase);

class SignInGoogleBase extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       error:null
    }
  }
  onSubmit=event=>{
      this.props.firebase
      .doSignInWithGoogle()
      .then((socialAuthUser)=>{
        return this.props.firebase
        .user(socialAuthUser.user.uid)
        .set({
          username:socialAuthUser.user.displayName,
          email:socialAuthUser.user.email,
          roles:{'ADMIN':null}
        })
      })
      .then(()=>{
        this.setState({error:null});
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error=>{
        this.setState({error});
      })
      event.preventDefault();
  }
  render(){
    const {error}= this.state;
    return(
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In With Google</button>
        {error&&<p>{error.message}</p>}
      </form>
    )
  }
  

}

class SignInFromBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => this.setState({ error }));
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.onChange}
          placeholder="Email Address"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.onChange}
          autoComplete="on"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          SignIN
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withRouter(SignInFromBase);
const SignInGoogle=withRouter(SignInGoogleBase)
export default SignInPage;
export { SignInForm };
