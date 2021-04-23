import React from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {NAV_PATH} from "./constant";
import {getRandomQuizzes} from "../server/db/quizzes";


function Home() {
    const currentQuiz = getRandomQuizzes(1)[0];

    function handleClick(correct) {
        console.log(correct);

        if (!correct) return alert("wrong");

        alert("correct");

    }
    return (
        <div>
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

const App = ()  => {
    return (
        <Router>
            <Switch>
                <Route exact path = {NAV_PATH.HOME}>
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
};

App.propTypes = {

};

export default App;