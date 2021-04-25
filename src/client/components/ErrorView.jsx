import React from "react";
import { Link } from "react-router-dom";
import { NAV_PATH } from "../constant";

export function ErrorView({ error }) {
  if (!error) return <></>;

  if (error.status === 401) {
    return (
      <div>
        <h2>Your not logged in, please log-in to continue</h2>
        <Link to={NAV_PATH.LOGIN}>
          <button>To login Page</button>
        </Link>
      </div>
    );
  }

  if (error.status === 404) {
    return (
      <div>
        <h1>Not Found</h1>
        <Link to={NAV_PATH.HOME}>
          <button>Return to HomePage</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{error.toString()}</h1>
      <Link to={NAV_PATH.HOME}>
        <button>Return to HomePage</button>
      </Link>
    </div>
  );
}
