import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import { NAV_PATH } from "./constant";
import { Match } from "./Match";
import { ErrorView } from "./components/ErrorView";
import { Home } from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function Header() {
  return (
    <header>
      <p className="header-text">You are not logged in</p>
      <div className="action-buttons">
        <NavLink className="header-logo" to={NAV_PATH.HOME}>
          Quiz
        </NavLink>
        <NavLink className="header-button" to={NAV_PATH.LOGIN}>
          LogIn
        </NavLink>
        <NavLink className="header-button" to={NAV_PATH.SIGNUP}>
          SignUp
        </NavLink>
      </div>
    </header>
  );
}

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={NAV_PATH.HOME}>
          <Home />
        </Route>
        <Route path={NAV_PATH.MATCH}>
          <Match />
        </Route>
        <Route path={NAV_PATH.LOGIN}>
          <Login />
        </Route>
        <Route path={NAV_PATH.SIGNUP}>
          <Signup />
        </Route>
        <Route>
          <ErrorView />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
