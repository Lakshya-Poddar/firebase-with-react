import React, { Component, useContext } from "react";
import { withRouter } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import AuthUserContext from './context'
const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    static contextType = FirebaseContext;
    componentDidMount() {
        const firebase = this.context;
      this.listener=firebase.auth.onAuthStateChanged(
          authUser=>{
              if(!condition(authUser)){

                  this.props.history.push(ROUTES.SIGN_IN);
              }
          }
      )
    }
    componentWillUnmount() {
        this.listener();
    }
    

    render() {
        
      return(
        <AuthUserContext.Consumer>{
          authUser=>
            condition(authUser)?<Component  {...this.props}/>:null
          
        }</AuthUserContext.Consumer>
      )
    }
  }

  return withRouter(WithAuthorization);
};
export default withAuthorization;
