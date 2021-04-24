import React from "react";
import { NAV_PATH } from "./constant";

const Login = () => {
  return (
    <div className="center">
      <div>
        <p>User Id:</p>
        <input type="text" />
      </div>
      <div>
        <p>Password:</p>
        <input type="password" />
      </div>

      {/*{error}*/}

      <button className="button">Log In</button>
      <button
        className="button"
        tabIndex="0"
        onClick={() => history.push(NAV_PATH.SIGNUP)}
      >
        Register
      </button>
    </div>
  );
};

Login.propTypes = {};

export default Login;
