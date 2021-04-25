import React, { useEffect, useState } from "react";
import { MATCH_ENDPOINT } from "./constant";
import { fetchJson, postJSON } from "./lib/http";

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
    setVictory(false);
    setDefeat(false);
    setQuiz(null);
    setCurrentIndex(0);

    try {
      await postJSON(MATCH_ENDPOINT.MATCH);
      const { currentQuiz } = await fetchJson(MATCH_ENDPOINT.STILLGOINGMATCH);
      setQuiz(currentQuiz);
      setNumberOfQuizzes(currentQuiz.length);
    } catch (e) {
      setError(e);
    }
  };

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
          <button className="play new-game-button" onClick={startNewMatch}>
            New Match
          </button>
        </div>
      </div>
    );
  }

  if (quiz) {
    const renderQuiz = quiz[currentIndex];
    console.log(quiz);
    console.log(renderQuiz);
    return (
      <div data-testid={"questions"} className="question">
        <h1>
          Question ({currentIndex + 1} / {numberOfQuizzes}): {quiz.question}
        </h1>
        {quiz.answers.map((alternative, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleClick(index)}
            data-testid={index}
          >
            {alternative}
          </button>
        ))}
      </div>
    );
  }
}
