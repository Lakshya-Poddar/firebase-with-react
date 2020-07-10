import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import * as ROUTES from "../../constants/routes";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp/index";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import { FirebaseContext } from "../Firebase";
import {AuthUserContext} from '../Session'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: {},
    };
  }
  static contextType = FirebaseContext;
  componentDidMount() {
    const firebase = this.context;
    this.listener = firebase.onAuthUserListener(
      (authUser)=>{
        this.setState({authUser})
      },
      ()=>{
        this.setState({authUser:null})
      }
    )
  }
  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <AuthUserContext.Provider value={{authUser:this.state.authUser}}>
      <Router>
        <div>
          <Navigation />
          <hr />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
      </AuthUserContext.Provider>
    );
  }
}

export default App;
