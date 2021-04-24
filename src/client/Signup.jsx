import React, { useState } from "react";
import { useHistory } from "react-router";
import { postJSON } from "./lib/http";
import { USER_AUTH_ENDPOINT } from "./constant";
import { useSubmit } from "./customhooks/useSubmit";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, onConfirmChange] = useState("");
  const history = useHistory();

  const { handleSubmit, submitting, error } = useSubmit(
    () => postJSON(USER_AUTH_ENDPOINT.SIGNUP, { userId, password }),
    () => history.push("/")
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
          <div>{confirmMsg}</div>
          <br />
        </label>

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
