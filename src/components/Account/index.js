import React, { useContext, Component } from "react";
import PasswordForgetPage from "../PasswordForget";
import { FirebaseContext } from "../Firebase";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";

const AccountPage = () => {
  var { authUser } = useContext(AuthUserContext);
  var firebase = useContext(FirebaseContext);
  var email = authUser ? authUser.email : "";
  return (
    <div>
      <h1>Account:{email}</h1>
      <p>{}</p>
      <PasswordForgetPage />
      <PasswordChangeForm />
      <LoginManagement authUser={authUser} firebase={firebase} />
    </div>
  );
};

class LoginManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null,
    };
  }
  componentDidMount() {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then((activeSignInMethods) =>{
        console.log(activeSignInMethods)
        this.setState({ activeSignInMethods, error: null })
      }
        
      )
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { activeSignInMethods, error } = this.state;
    return (
      <div>
        Sing IN Methods:
        <ul>
          {SIGN_IN_METHODS.map((signInMethod) => {
            const isEnabled = activeSignInMethods.includes(signInMethod.id);
            return (
              <li key={signInMethod.id}>
                {isEnabled ? (
                  <button type="button" onClick={() => {}}>
                    Deactivate {signInMethod.id}
                  </button>
                ) : (
                  <button type="button" onClick={() => {}}>
                    Link {signInMethod.id}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
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
