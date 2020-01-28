import React from "react";
import {Link, Route, Switch} from 'react-router-dom';
import Login from "../Login";
import './AppRouter.css'

const AppRouter = () => {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/login">Авторизация</Link>
        </li>
      </ul>

      <Switch>
        <Route path='/login' component={Login}/>
      </Switch>

    </div>
  );
};

export default AppRouter;