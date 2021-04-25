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
