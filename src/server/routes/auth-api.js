const express = require("express");
const router = express.Router();
const passport = require("passport");
const { StatusCode } = require("status-code-enum");
const userDatabase = require("../db/users");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(204).send();
});

router.post("/signup", (req, res) => {
  const { userId, password } = req.body;

  const authorizedUser = userDatabase.createUser(userId, password);

  if (!authorizedUser) {
    return res.sendStatus(StatusCode.ClientErrorUnauthorized);
  }

  passport.authenticate("local")(req, res, () => {
    req.session.save((err) => {
      if (err) res.status(StatusCode.ClientErrorBadRequest).send();
      else res.status(StatusCode.SuccessCreated).send();
    });
  });
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(StatusCode.SuccessNoContent).send();
});

module.exports = router;
