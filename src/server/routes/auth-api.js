const express = require("express");
const router = express.Router();
const passport = require("passport");
const { StatusCode } = require("status-code-enum");
const userDatabase = require("../db/users");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(204).json({});
});

router.post("/signup", (req, res) => {
  const { userId, password } = req.body;

  const authorizedUser = userDatabase.createUser(userId, password);

  if (!authorizedUser) {
    return res.sendStatus(StatusCode.ClientErrorUnauthorized).json({});
  }

  passport.authenticate("local")(req, res, () => {
    req.session.save((err) => {
      if (err) res.status(StatusCode.ClientErrorBadRequest).json({});
      else res.status(StatusCode.SuccessCreated).json({});
    });
  });
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(StatusCode.SuccessNoContent).json({});
});

router.get("/user", (req, res) => {
  if (!req.user) return res.sendStatus(StatusCode.ClientErrorUnauthorized);

  const { password, ...user } = req.user;

  res.status(StatusCode.SuccessOK).json(user);
});

module.exports = router;
