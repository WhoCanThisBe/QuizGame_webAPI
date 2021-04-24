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
        <NavLink className="header-logo" to={NAV_PATH.HOME} tabIndex="0">
          Quiz
        </NavLink>
        <NavLink className="header-button" to={NAV_PATH.LOGIN} tabIndex="0">
          LogIn
        </NavLink>
        <NavLink className="header-button" to={NAV_PATH.SIGNUP} tabIndex="0">
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
        <Route>
          <Login path={NAV_PATH.LOGIN} />
        </Route>
        <Route>
          <Signup path={NAV_PATH.SIGNUP} />
        </Route>
        <Route>
          <ErrorView />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
