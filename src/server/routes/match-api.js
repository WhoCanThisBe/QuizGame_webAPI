const { StatusCode } = require("status-code-enum");

const express = require("express");
const { removeMatch } = require("../db/match");
const { reportEndOfMatch } = require("../db/users");
const { createMatch } = require("../db/match");
const { getMatch } = require("../db/match");
const router = express.Router();

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

const endGame = (req, match, victory) => {
  victory ? (match.victory = true) : (match.defeat = true);
  reportEndOfMatch(req.user.id, victory);
  removeMatch(req.user.id);
};

router.post("/matches", (req, res) => {
  if (!req.user) return res.status(StatusCode.ClientErrorUnauthorized).send();
  const match = createMatch(req.user.id, 3);
  const payload = getPayload(match);

  res.status(StatusCode.SuccessCreated).json(payload);
});

router.get("/stillgoingmatch", (req, res) => {
  if (!req.user) return res.status(StatusCode.ClientErrorUnauthorized).send();

  const match = getMatch(req.user.id);
  if (!match) return res.status(StatusCode.ClientErrorNotFound).send();

  const payload = getPayload(match);
  res.status(StatusCode.SuccessOK).json(payload);
});

router.post("/stillgoingmatch", (req, res) => {
  if (!req.user) return res.status(401).send();

  const match = getMatch(req.user.id);
  if (!match || match.victory || match.defeat) return res.status(400).send();

  const { indexOfRightAnswer } = match.quizzes[match.current];
  const { selectedAnswer } = req.body;
  if (selectedAnswer === indexOfRightAnswer) {
    match.current++;
    if (match.current === match.quizzes.length) endGame(req, match, true);
  } else {
    endGame(req, match, false);
  }

  const payload = getPayload(match);

  res.status(201).json(payload);
});

// Why do we have this here when we have a "/api/user"-endpoint in auth-api.js that does the same!?
// router.get("/user", (req, res) => {
//   if (!req.user) return res.status(401).send();
//   res.status(200).json({
//     id: req.user.id,
//     victories: req.user.victories,
//     defeats: req.user.defeats,
//   });
// });

module.exports = router;
