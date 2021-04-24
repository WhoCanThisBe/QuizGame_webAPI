const quizzes = [
  {
    question: "What kind of language is JavaScript?",
    answers: [
      "Strongly and statically typed",
      "Strongly and dynamically typed",
      "Weakly and statically typed",
      "Weakly and dynamically typed",
    ],
    indexOfRightAnswer: 0,
  },
  {
    question:
      "In JavaScript, what is the result of the following?\n\n+(!![]+!![]+!![]+!![]+[]+(!![]+!![]))",
    answers: ["Compilation exception", "Runtime exception", "42", "'42'"],
    indexOfRightAnswer: 0,
  },
  {
    question:
      "In JavaScript, what is the result of the following?\n\n[3,18,1,2].sort()\n",
    answers: [
      "[1, 2, 3, 18]",
      "[1, 18, 2, 3]",
      "[18, 1, 2, 3]",
      "Runtime exception",
    ],
    indexOfRightAnswer: 0,
  },
  {
    question:
      "In JavaScript, what is the result  of the following?\n\nfalse + true?",
    answers: ["false", "true", "'falsetrue'", "1"],
    indexOfRightAnswer: 0,
  },
  {
    question: "What is Babel mainly used for?",
    answers: [
      "To transpile code into valid JS code",
      "To bundle together the code of different JS files",
      "To download third-party dependencies",
      "To run test cases",
    ],
    indexOfRightAnswer: 0,
  },
];

function getRandomQuizzes(numberOfQuizzes) {
  if (numberOfQuizzes < 1) {
    throw "Invalid number of requested quizzes: " + numberOfQuizzes;
  }

  if (numberOfQuizzes > quizzes.length) {
    throw "Too many quizzes";
  }

  const selection = Array(numberOfQuizzes);

  let i = 0;
  while (i < numberOfQuizzes) {
    const k = Math.floor(quizzes.length * Math.random());
    if (selection.includes(k)) {
      continue;
    }

    selection[i] = k;
    i++;
  }

  return Array.from(selection).map((e) => quizzes[e]);
}

module.exports = { quizzes, getRandomQuizzes };
