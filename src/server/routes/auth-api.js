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

router.get("/user", (req, res) => {
  const { userId } = req.user;

  const user = userDatabase.getUser(userId);

  if (!user) return res.sendStatus(StatusCode.ClientErrorNotFound);

  const { password, ...userWithoutPassword } = user;

  res.send(StatusCode.SuccessOK).send(userWithoutPassword);
});

module.exports = router;
