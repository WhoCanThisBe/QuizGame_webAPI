import {getRandomQuizzes} from "../server/db/quizzes";
import React from "react";

export function Match() {
    const currentQuiz = getRandomQuizzes(1)[0];

    function handleClick(correct) {
        console.log(correct);

        if (!correct) return alert("wrong");

        alert("correct");

    }

    return (
        <div data-testid={"questions"} className='question'>
            <h1>Question (1 / 3): {currentQuiz.question}</h1>
            {currentQuiz.answers.map((alternative, index) => (
                <button
                    type="button"
                    key={index}
                    onClick={() =>
                        handleClick(index === currentQuiz.indexOfRightAnswer)
                    }
                >
                    {alternative}
                </button>
            ))}
        </div>
    );
}