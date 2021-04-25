import React, { useEffect, useState } from "react";
import { MATCH_ENDPOINT } from "./constant";
import { fetchJson, postJSON } from "./lib/http";
import { ErrorView } from "./components/ErrorView";

export function Match() {
  const [victory, setVictory] = useState(null);
  const [defeat, setDefeat] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [numberOfQuizzes, setNumberOfQuizzes] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    startNewMatch();
  }, []);

  const startNewMatch = async () => {
    setVictory(false);
    setQuiz(null);
    setDefeat(false);
    setCurrentIndex(0);
    setQuiz(null);

    try {
      await postJSON(MATCH_ENDPOINT.MATCH);
      const { numberOfQuizzes, currentQuiz } = await fetchJson(
        MATCH_ENDPOINT.STILLGOINGMATCH
      );
      setQuiz(currentQuiz);
      setNumberOfQuizzes(numberOfQuizzes);
    } catch (e) {
      setError(e);
    }
  };

  const handleClick = async (index) => {
    try {
      const data = await postJSON(MATCH_ENDPOINT.STILLGOINGMATCH, {
        selectedAnswer: index,
      });
      setVictory(data.victory);
      setDefeat(data.defeat);
      setQuiz(data.currentQuiz);
      setCurrentIndex(data.currentIndex);
    } catch (e) {
      setError(e);
    }
  };

  if (error) {
    return <ErrorView error={error} />;
  }

  if (!quiz) return <h1>loading</h1>;

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
    console.log(quiz);
    return (
      <div data-testid={"questions"} className="question">
        <h1>
          Question ({currentIndex + 1} / {numberOfQuizzes}):{" "}
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
