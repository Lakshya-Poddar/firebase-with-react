import React, { Component, useContext } from "react";
import { withRouter } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import AuthUserContext from "./context";
const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    static contextType = FirebaseContext;
    componentDidMount() {
      const firebase = this.context;
      this.listener = firebase.onAuthUserListener(
        authUser=>{
          if(!condition(authUser))
          {
            this.props.history.push(ROUTES.SIGN_IN)
          }
        }
        ,
        ()=>{
          this.props.history.push(ROUTES.SIGN_IN)
        }
      )
    }
    // componentWillUnmount() {
    //   this.listener();
    // }

    render() {
      return (
        //authusercontext.consumer
        <Component {...this.props} /> 
      );
    }
  }

  return withRouter(WithAuthorization);
};
export default withAuthorization;
