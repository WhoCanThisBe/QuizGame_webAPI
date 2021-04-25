import React, { useState } from "react";
import { StatusCode } from "status-code-enum";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "./constant";
import { useHistory } from "react-router";
import { useSubmit } from "./customhooks/useSubmit";
import { post, postJSON } from "./lib/http";

const Login = ({ setLoggedIn }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { handleSubmit, submitting, error } = useSubmit(
    () => post(USER_AUTH_ENDPOINT.LOGIN, { userId, password }),
    () => {
      setLoggedIn();
      history.push(NAV_PATH.HOME);
    }
  );

  const errorMsg =
    error?.status === StatusCode.ClientErrorUnauthorized
      ? "Invalid username/password"
      : error?.toString();

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>
          User Id:
          <br />
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Password:
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        {error && <p>{errorMsg}</p>}

        {/*So no one can submit while one is submitting*/}
        <button
          className="button"
          type={"submit"}
          disabled={!password || submitting}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
