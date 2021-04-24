import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "./constant";
import { fetchJson } from "./lib/http";
import { Match } from "./Match";
import { ErrorView } from "./components/ErrorView";
import { Home } from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function Header({ user, ...props }) {
  const isLoggedIn = !!user;
  const message = isLoggedIn
    ? `welcome ${user.userId}`
    : "You are not logged in";

  const buttons = isLoggedIn ? (
    <>
      <NavLink className="header-button" to={NAV_PATH.HOME}>
        LogOut
      </NavLink>
    </>
  ) : (
    <>
      <NavLink className="header-button" to={NAV_PATH.LOGIN}>
        LogIn
      </NavLink>
      <NavLink className="header-button" to={NAV_PATH.SIGNUP}>
        SignUp
      </NavLink>
    </>
  );

  return (
    <header>
      <p className="header-text">{message}</p>
      <div className="action-buttons">
        <NavLink className="header-logo" to={NAV_PATH.HOME}>
          Quiz
        </NavLink>
        {buttons}
      </div>
    </header>
  );
}

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchUserInfo = async () => {
      const payload = await fetchJson(USER_AUTH_ENDPOINT.USER_INFO);
      setUser(payload);
    };
    fetchUserInfo();
  }, [user]);

  return (
    <Router>
      <Header user={user} />
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
