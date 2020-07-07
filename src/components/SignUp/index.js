import React, { Component, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import * as Routes from "../../constants/routes";
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

const INITIAL_STATE = {
  username: "",
  email: "",
  password1: "",
  password2: "",
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
    const { password1, email } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password1)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(Routes.HOME);
      })
      
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { username, email, password1, password2, error } = this.state;
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
