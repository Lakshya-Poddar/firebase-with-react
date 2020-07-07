import React,{useContext} from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOut from  '../SignOut'
import {AuthUserContext} from '../Session'
function Navigation() {
    const {authUser}=useContext(AuthUserContext)
    return (
       <div>{authUser?<NavigationAuth />:<NavigationNonAuth />}</div>
    )
}
const NavigationAuth=()=>(
<ul>
    <li>
        <Link to={ROUTES.LANDING}>LANDING</Link>
    </li>
    <li>
        <Link to={ROUTES.HOME}>HOME</Link>
    </li>
    <li>
        <Link to={ROUTES.ACCOUNT}>ACCOUNT</Link>
    </li>
    <li>
        <Link to={ROUTES.ADMIN}>ADMIN</Link>
    </li>
    <li>
        <SignOut />
    </li>
</ul>
);
const NavigationNonAuth=()=>(
<ul>
    <li>
        <Link to={ROUTES.SIGN_IN}>SIGN_IN</Link>
    </li>
    <li>
        <Link to={ROUTES.LANDING}>LANDING</Link>
    </li>
</ul>
)

export default Navigation
