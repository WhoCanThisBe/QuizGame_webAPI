const express = require("express");
const { createMatch } = require("../db/match");
const { getMatch } = require("../db/match");

const getPayload = (match) => {
  const shallowCopy = Object.assign({}, match.quizzes[match.current]);
  shallowCopy.correct = undefined;

  return {
    id: match.id,
    currentIndex: match.current,
    currentQuiz: shallowCopy,
    victory: match.victory,
    defeat: match.defeat,
    numberOfQuizzes: match.quizzes.length,
  };
};

const router = express.Router();

router.post("/matches", (req, res) => {
  const match = createMatch(req.user.id, 3);
  const payload = getPayload(match);

  /*
    Adding header so postJSON can check that before trying to extract JSON-content...
    NB: Have to do this because there are some endpoints that take a POST-reqest -
        but does not return JSON-content (e.g: /api/login)
   */

  // NB: res.type is a "shorthand"-version of res.set("Content-Type", "[enter MIME-type here]")
  // example: res.type("json") is the shorthand for res.type("application/json") -
  // and res.set("Content-Type","application/json").
  // Link to info: https://flaviocopes.com/express-headers/
  res.type("json");

  res.status(201).json(payload);
});

router.get("/stillgoingmatch", (req, res) => {
  if (!req.user) return res.status(401).send();
  console.log(req.user);
  const match = getMatch(req.user.id);
  console.log("dsdd! " + match);
  if (!match) return res.status(404).send();

  const payload = getPayload(match);
  res.status(200).json(payload);
});

module.exports = router;
