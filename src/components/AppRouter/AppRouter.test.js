import React from "react";
import {shallow} from 'enzyme';
import {Route, Switch} from "react-router-dom";
import {AppRouter} from "./AppRouter";
import ProtectedRoute from "../ProtectedRoute";


describe('[ AppRouter ]', () => {
  const wrapper = shallow(<AppRouter />);
  console.log(wrapper.debug());

  it('должен содержать <Switch> ', () => {
    expect(wrapper.find(Switch)).toHaveLength(1);
  });

  describe('[ Switch ]', () => {
    it('должен содержать <ProtectedRoute path="/user/me"/>', () => {
      expect(wrapper.containsMatchingElement(<ProtectedRoute path='/user/me'/>)).toBeTruthy();
    });

    it('должен содержать <ProtectedRoute path="/user/:name"/>', () => {
      expect(wrapper.containsMatchingElement(<ProtectedRoute path='/user/:name'/>)).toBeTruthy();
    });

    it('должен содержать <Route path="/login"/>', () => {
      expect(wrapper.containsMatchingElement(<Route path='/login'/>)).toBeTruthy();
    });
  });
});