import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Auth from "./hoc/auth.js";
//component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined;
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, true)}></Route>
          <Route
            exact
            path="/register"
            component={Auth(RegisterPage, false, null)}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
