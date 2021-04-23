This is a part of a lecture in WebApi I attended, this is a repeated work for
myself for preparing to the exam. So the packages.json are already done for future work in the beginning
of the commit
# Quiz Game



#### presets 
* [x] Add package JSON file with the dependencies
* [x] Fix test source root and jest config



## Part 1

* *style.css*: CSS style file.
* *code.js*: where you will have the JavaScript code running the game.
* *index.html*: a web page for the Quiz Game, accessing the other 2 files.


In *code.js*, create an array of quizzes. A quiz is composed of:

* [x] A question.
* [x] 4 possible answers.
* [x] An integer representing which of the 4 answers is the correct one.
  
When a user open *index.html*, one random quiz should be displayed (you
can use JS built-in functions like *Math.random()*).
Each of the 4 answers should be a clickable button.
Clicking the right answer should display a victory message (e.g., using
the JS *alert()* function), and then display a new random quiz.
On the other hand, clicking on a wrong answer should display an error message.