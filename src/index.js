
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Child from "./views/project/[id]";
import ChildT from "./views/timesheets/[id]";
import Dashboard from "./views/Index.js";
import Login from "./views/user/login.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/project/:id" children={<Child/> }/>
      <Route path="/timesheets/:id" children={<ChildT />} />
      <Route path="/dashboard/" >
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
      </Route>
      <Redirect from="/" to="/auth/index"/>
    </Switch>
    
  </BrowserRouter>,
  document.getElementById("root")
);
