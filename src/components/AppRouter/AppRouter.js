import React from "react";
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import Login from "../Login";
import {connect} from "react-redux";
import {getIsAuthorize} from "../../ducks/auth";
import UserPage from "../UserPage";
import './AppRouter.css'
import ProtectedRoute from "../ProtectedRoute";

const AppRouter = (props) => {
  const { isAuthorized } = props;
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/login">Авторизация</Link>
        </li>
        <li>
          <Link to="/user/me">Страница пользователя</Link>
        </li>
      </ul>

      <Switch>
        {!isAuthorized && <Route path='/login' component={Login}/>}
        <ProtectedRoute path='/user/me' component={UserPage}/>
        <Redirect to="/user/me"/>
      </Switch>

    </div>
  );
};

export default connect(state => ({
  isAuthorized: getIsAuthorize(state)
}))(AppRouter);