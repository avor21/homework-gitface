import React, {Component} from "react";
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import Login from "../Login";
import {connect} from "react-redux";
import {getIsAuthorize, logout} from "../../ducks/auth";
import UserPage from "../UserPage";
import './AppRouter.css'
import ProtectedRoute from "../ProtectedRoute";


export class AppRouter extends Component {
  render() {
    const { isAuthorized } = this.props;

    return (
      <div className="App">

        <ul>
          <li>
            <Link to="/login">Авторизация</Link>
          </li>

          { isAuthorized &&
            <>
              <li><Link to="/user/me">Страница пользователя</Link></li>
              <li><Link to="/logout" onClick={this.logoutHandler}>Выход</Link></li>
            </>
          }
        </ul>

        <Switch>
          <Route path='/login' component={Login}/>
          <ProtectedRoute path='/user/me' component={UserPage}/>
          <ProtectedRoute path='/user/:name' component={UserPage}/>
          <Redirect to="/user/me"/>
        </Switch>

      </div>
    );
  }

  logoutHandler = (e) => {
    e.preventDefault();
    this.props.logout();

  };
}

export default connect(state => ({
  isAuthorized: getIsAuthorize(state)
}), { logout })(AppRouter);