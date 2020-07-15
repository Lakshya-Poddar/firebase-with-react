import React, { Component, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import * as Routes from "../../constants/routes";
import * as ROLES from '../../constants/roles'

import { FirebaseContext } from "../Firebase";
const SignUpPage = () => {
  const firebase = useContext(FirebaseContext);
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm firebase={firebase} />
    </div>
  );
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with this E-Mail address already exists.
Try to login with this account instead. If you think the
account is already used from one of the social logins, try
to sign-in with one of them. Afterward, associate your accounts
on your personal account page.
`;
const INITIAL_STATE = {
  username: "",
  email: "",
  password1: "",
  password2: "",
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  onSubmit = (event) => {
    const { username, password1, email,isAdmin } = this.state;
    const roles={};
    if(isAdmin)
    roles[ROLES.ADMIN]=ROLES.ADMIN;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password1)
      .then((authUser) => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(Routes.HOME);
      })

      .catch((error) => {
        if(error.code===ERROR_CODE_ACCOUNT_EXISTS)
        error.message=ERROR_MSG_ACCOUNT_EXISTS
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      username,
      email,
      password1,
      password2,
      isAdmin,
      error,
    } = this.state;
    const isInvalid =
      password1 !== password2 ||
      password1 === "" ||
      email === "" ||
      username === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="password1"
          value={password1}
          autoComplete="on"
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="password2"
          value={password2}
          autoComplete="on"
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <button type="submit" disabled={isInvalid}>
          SignUp
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={Routes.SIGN_UP}>SignUp</Link>
  </p>
);
const SignUpForm = withRouter(SignUpFormBase);
export default SignUpPage;
export { SignUpForm, SignUpLink };
