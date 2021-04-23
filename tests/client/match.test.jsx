import React from "react";
import { Match } from "../../src/client/Match";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import {screen, render, fireEvent} from "@testing-library/react";
import { getRandomQuizzes } from "../../src/server/db/quizzes";

test.skip("display quiz", () => {
  //TODO: make an better test

  const matchDisplay = (
    <MemoryRouter>
      <Match />
    </MemoryRouter>
  );

  const tree = renderer.create(matchDisplay).toJSON();

  expect(tree).toMatchSnapshot();
});

const quiz1 =  [
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





test("checkQuizDisplayed and clicking the wrong answer", () => {
  jest.mock("../../src/server/db/quizzes");

//this is for mocking a return av a function call
  getRandomQuizzes.mockReturnValue(quiz1);

  render(
    <MemoryRouter>
      <Match />
    </MemoryRouter>
  );
  expect(screen.getByText(/question/i)).toBeInTheDocument();

  const wrongAnswer = quiz1[0].answers[3]

  fireEvent.click(screen.getByText(wrongAnswer),{bubbles: true})

  expect(screen.getByText(/lost/i)).toBeInTheDocument()

});


test('clicking the right answer three times',()=>{

  render(
      <MemoryRouter>
        <Match />
      </MemoryRouter>
  );
  expect(screen.getByText(/question/i)).toBeInTheDocument();


  fireEvent.click(screen.getByTestId(0),{bubbles: true})
  fireEvent.click(screen.getByTestId(0),{bubbles: true})
  fireEvent.click(screen.getByTestId(0),{bubbles: true})

  expect(screen.getByText(/won/i))

})
