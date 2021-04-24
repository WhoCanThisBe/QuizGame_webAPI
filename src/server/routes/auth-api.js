const express = require("express");
const router = express.Router();
const passport = require("passport");
const { StatusCode } = require("status-code-enum");
const userDatabase = require("../db/users");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(204).send();
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const authorizedUser = userDatabase.createUser(username, password);

  if (!authorizedUser) {
    return res.sendStatus(StatusCode.ClientErrorUnauthorized);
  }

  passport.authenticate("local")(req, res, () => {
    req.session.save((err) => {
      if (err) res.sendStatus(StatusCode.ClientErrorBadRequest);
      else res.status(StatusCode.SuccessCreated).send();
    });
  });
});

module.exports = router;
