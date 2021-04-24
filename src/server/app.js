require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const match = require("./routes/match-api");
const authApi = require("./routes/auth-api");
const { verifyUser, getUser } = require("./db/users");

//JSON body parse without bodyparser
app.use(express.json());

// Express session
app.use(
  session({
    secret: "sdfdfdfdfgdg1111",
    resave: false,
    saveUninitialized: false,
  })
);

const authFields = {
  usernameField: "userId",
  passwordField: "password",
};

passport.use(
  new LocalStrategy(authFields, (userId, password, done) => {
    if (verifyUser(userId, password)) {
      console.log({ userId });
      done(null, getUser(userId));
    } else {
      console.log("else");
      done(null, false, { message: "Invalid username/password" });
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = getUser(id);
  done(null, user ? user : null);
});

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api", match);
app.use("/api", authApi);

// Serving static content from ./dist/*
app.use(express.static("dist"));

app.use((req, res, next) => {
  // We only want to send the index.html file when we receive a GET request to "/" or "/quiz" etc. (everything on
  // the root-path, not our internal API-paths).
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    // Go to the next middleware in the stack
    next();
  }
});

module.exports = app;
