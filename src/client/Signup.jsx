import React, { useState } from "react";
import { useHistory } from "react-router";
import { postJSON } from "./lib/http";
import { USER_AUTH_ENDPOINT } from "./constant";
import { useSubmit } from "./customhooks/useSubmit";

const Signup = () => {
  // const [userId, setUserId] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirm, onConfirmChange] = useState("");
  // const history = useHistory();
  //
  // const { handleSubmit, submitting, error } = useSubmit(
  //   () => postJSON(USER_AUTH_ENDPOINT.SIGNUP, { userId, password }),
  //   () => history.push("/")
  // );

  return (
    <div className="center">
      <h1>Test</h1>
      {/*<h1>dsds</h1>*/}
      {/*<form onSubmit={handleSubmit}>*/}
      {/*  <div>*/}
      {/*    <p>User Id:</p>*/}
      {/*    <input type="text" value={userId} onChange={setUserId} />*/}
      {/*  </div>*/}

      {/*  <div>*/}
      {/*    <h1>Signup</h1>*/}
      {/*    /!*{error && <p>error.toString</p>}*!/*/}
      {/*    <p>Password:</p>*/}
      {/*    <input type="password" value={password} onChange={setPassword} />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <p>Confirm:</p>*/}
      {/*    <input type="password" value={confirm} onChange={onConfirmChange} />*/}
      {/*    /!*<div>{confirmMsg}</div>*!/*/}
      {/*  </div>*/}

      {/*  /!*TODO: Invalid userId/password*!/*/}

      {/*  <button className="button" onClick={doSignUp}>*/}
      {/*    Sign Up*/}
      {/*  </button>*/}
      {/*</form>*/}
    </div>
  );
};

export default Signup;
