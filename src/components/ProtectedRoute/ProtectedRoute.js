import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {getIsAuthorize} from "../../ducks/auth";

export class ProtectedRoute extends Component {
  render() {
    const {component, ...rest} = this.props;
    return <Route {...rest} render={this.renderProtected}/>
  }

  renderProtected = (routeProps) => {
    const { component: ProtectedComponent, isAuthorized } = this.props;
    return isAuthorized
      ? <ProtectedComponent {...routeProps} />
      : <Redirect to="/login" />
  }
}

export default connect(state => ({
  isAuthorized: getIsAuthorize(state)
}))(ProtectedRoute);