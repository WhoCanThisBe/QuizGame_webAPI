import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "./constant";
import { useSubmit } from "./customhooks/useSubmit";
import { fetchJson, postJSON } from "./lib/http";
import { Match } from "./Match";
import { ErrorView } from "./components/ErrorView";
import { Home } from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function Header({ user, onLogout, ...props }) {
  const history = useHistory();

  const { isSubmitting: isLoggingOut, handleSubmit: handleLogout } = useSubmit(
    () => postJSON(USER_AUTH_ENDPOINT.LOGOUT),
    () => {
      onLogout();
      history.push(NAV_PATH.HOME);
    }
  );

  // Using "double bangs" here to have a consistent "true/false"-value (e.g: we can use "!isLoggedIn" in an if-block
  // and don't have to worry about the value being inverted, which would happen if the value was truthy/falsy...)
  const isLoggedIn = !!user;
  const message = isLoggedIn ? `welcome ${user.id}` : "You are not logged in";

  let buttons = (
    <>
      <NavLink className="header-button" to={NAV_PATH.LOGIN}>
        LogIn
      </NavLink>
      <NavLink className="header-button" to={NAV_PATH.SIGNUP}>
        SignUp
      </NavLink>
    </>
  );

  // Only show the Logout-button if the user is logged-in
  if (isLoggedIn) {
    buttons = (
      <>
        <button onClick={handleLogout} disabled={isLoggingOut}>
          LogOut
        </button>
      </>
    );
  }

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
  const [isRegistered, setIsRegistered] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const payload = await fetchJson(USER_AUTH_ENDPOINT.USER_INFO);
      setUser(payload);
    } catch (err) {
      // Nothing special that App must do here, so only logging out the error
      console.error(`[${App.name}] - ${err.message}`);
    }
  };

  // TODO: Remove/change this useEffect after setting up WebSockets
  useEffect(() => {
    //if (!isRegistered) return;
    fetchUserInfo();
  }, [isRegistered]);

  return (
    <Router>
      <Header
        user={user}
        onLogout={() => {
          setIsRegistered(false);
          setUser(null);
        }}
      />
      <Switch>
        <Route exact path={NAV_PATH.HOME}>
          <Home />
        </Route>
        <Route path={NAV_PATH.MATCH}>
          <Match />
        </Route>
        <Route path={NAV_PATH.LOGIN}>
          <Login setLoggedIn={() => setIsRegistered(true)} />
        </Route>
        <Route path={NAV_PATH.SIGNUP}>
          <Signup setLoggedIn={() => setIsRegistered(true)} />
        </Route>
        <Route>
          <ErrorView />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
