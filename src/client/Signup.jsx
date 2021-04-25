import React, { useState } from "react";
import { useHistory } from "react-router";
import { post, postJSON } from "./lib/http";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "./constant";
import { useSubmit } from "./customhooks/useSubmit";

const Signup = ({ setLoggedIn, ...props }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, onConfirmChange] = useState("");
  const history = useHistory();

  const { handleSubmit, submitting, error } = useSubmit(
    () => post(USER_AUTH_ENDPOINT.SIGNUP, { userId, password }),
    () => {
      // TODO: Remove/change this after setting up WebSockets
      // Trigger fetching of userInfo in App
      setLoggedIn();
      history.push(NAV_PATH.HOME);
    }
  );

  const isTheSame = password === confirm;

  let confirmMsg = isTheSame ? "ok" : "not the same";

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
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
        <label>
          Confirm:
          <br />
          <input
            type="password"
            value={confirm}
            onChange={(e) => onConfirmChange(e.target.value)}
            required
          />
          <div>{confirm.length > 0 && confirmMsg}</div>
          <br />
        </label>

        {error && <p>{error.toString()}</p>}

        <button
          className="button"
          type={"submit"}
          disabled={!isTheSame || submitting}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
