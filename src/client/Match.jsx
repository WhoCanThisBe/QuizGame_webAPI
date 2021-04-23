import {getRandomQuizzes} from "../server/db/quizzes";
import React, {useEffect, useState} from "react";

export function Match() {
    const [victory, setVictory] = useState(null)
    const [defeat, setDefeat] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [currentIndex,setCurrentIndex] = useState(0)
    const [numberOfQuizzes, setNumberOfQuizzes] = useState(null)

    useEffect(() => {
            startNewMatch();
    }, []);



    const startNewMatch = () =>{

            const quizzes = getRandomQuizzes(3);
            console.log(quizzes)
            setVictory(false)
            setDefeat(false)
            setQuiz(quizzes)
            setNumberOfQuizzes(quizzes.length)
            setCurrentIndex(0)

    }

    function handleClick(correct) {
        console.log({correct})
        if (!correct) {
            setDefeat(true)
            setCurrentIndex(0)
            return
        }
        if(currentIndex === (numberOfQuizzes-1)){
            setVictory(true)
            return;
        }
        setCurrentIndex((prevIndex)=> prevIndex+1)

    }

    console.log(quiz)

    if(!quiz){
        return(
            <h1>loading</h1>)
    }

    if(victory) {
        return (
            <div className="game-result">
                <h2>You Won!</h2>
                <div className="action">
                    <button className="play new-game-button" onClick={startNewMatch}>New Match</button>
                </div>
            </div>
        );
    }

    if (defeat) {
        return (
            <div className="game-result">
                <h2>Wrong Answer! You Lost!</h2>
                <div className="action">
                    <button className="play new-game-button" onClick={startNewMatch}>New Match</button>
                </div>
            </div>
        );
    }


    if(quiz){
        const renderQuiz = quiz[currentIndex]
    return (
        <div data-testid={"questions"} className='question'>
            <h1>Question ({currentIndex +1} / {numberOfQuizzes}): {renderQuiz.question}</h1>
            {renderQuiz.answers.map((alternative, index) => (
                <button
                    type="button"
                    key={index}
                    onClick={() =>
                        handleClick(index === renderQuiz.indexOfRightAnswer)
                    }
                >
                    {alternative}
                </button>
            ))}
        </div>
    );
    }

}