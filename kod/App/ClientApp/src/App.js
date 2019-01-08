import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import ManagerPanel from "./components/MangerPanel";
import {
  isAdmin,
  isManager,
  isClient
} from "./store/helpers/recoginzeRole";
import OrderList from "./components/OrderList";
import { mapStateToProps } from "./store/helpers/mapStateToProps";

class App extends Component {

  routes = () => {
    if (isClient(this.props)) {
      return (
        <Switch>
          <Route path="/my-orders" component={OrderList} />
          <DefaultRoute>
            <Home />
          </DefaultRoute>
        </Switch>
      );
    } else if (isAdmin(this.props)) {
      return (
        <DefaultRoute>
          <AdminPanel />
        </DefaultRoute>
      );
    } else if (isManager(this.props)) {
      return (
        <DefaultRoute>
          <ManagerPanel />
        </DefaultRoute>
      );
    } else {
      return (
        <DefaultRoute>
          <Home />
        </DefaultRoute>
      );
    }
  };

  render = () => {
    return <Layout>{this.routes()}</Layout>;
  };
}

const DefaultRoute = ({ children }) => (
  <Route
    path="/*"
    render={() => (
      <Fragment>
        {window.location.pathname.length > 1 ? <Redirect to="/" /> : ""}
        {children}
      </Fragment>
    )}
  />
);

export default withRouter(connect(mapStateToProps)(App));
