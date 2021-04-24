import React, {useEffect, useState} from "react";
import {MATCH_ENDPOINT} from "./constant";
import {postJSON} from "./lib/http";

export function Match() {
  const [victory, setVictory] = useState(null);
  const [defeat, setDefeat] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numberOfQuizzes, setNumberOfQuizzes] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    startNewMatch();
  }, []);

  const startNewMatch = async () => {
    const quizzes = await getRandomQuizzes(3);
    setVictory(false);
    setDefeat(false);
    setQuiz(quizzes);
   await setNumberOfQuizzes(quizzes.length);
    setCurrentIndex(0);
  };

  const getRandomQuizzes = async (numberOfQuizzes)  =>{
    if (numberOfQuizzes < 1) {
      throw "Invalid number of requested quizzes: " + numberOfQuizzes;
    }

    let payload;

    try{
      payload = await postJSON(MATCH_ENDPOINT.MATCH);
    }catch (e){
      setError(e);
    }
    return payload;
  }


  function handleClick(correct) {
    if (!correct) {
      setDefeat(true);
      setCurrentIndex(0);
      return;
    }
    if (currentIndex === numberOfQuizzes - 1) {
      setVictory(true);
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  if (!quiz) {
    return <h1>loading</h1>;
  }

  if (victory) {
    return (
      <div className="game-result">
        <h2>You Won!</h2>
        <div className="action">
          <button className="play new-game-button" onClick={startNewMatch}>
            New Match
          </button>
        </div>
      </div>
    );
  }

  if (defeat) {

    return (
      <div className="game-result">
        <h2>Wrong Answer! You Lost!</h2>
        <div className="action">
          <button className="play new-game-button" onClick={startNewMatch} >
            New Match
          </button>
        </div>
      </div>
    );
  }

  if (quiz) {
    const renderQuiz = quiz[currentIndex];
    return (
      <div data-testid={"questions"} className="question">
        <h1>
          Question ({currentIndex + 1} / {numberOfQuizzes}):{" "}
          {renderQuiz.question}
        </h1>
        {renderQuiz.answers.map((alternative, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleClick(index === renderQuiz.indexOfRightAnswer)}
            data-testid={index}
          >
            {alternative}
          </button>
        ))}
      </div>
    );
  }
}
