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


## Part 2 && Part 3

* [x] Split the JS code from previous exercise into two different files: `index.js`
  and `quizzes.js`.
  This latter should contain your array of pre-defined quizzes.
  Create a new function called `getRandomQuizzes`, that takes as input an integer
  `numberOfQuizzes` and returns a new array of *unique* quizzes chosen at random.
  It should throw an exception when  `numberOfQuizzes`  is invalid.
  The main `index.js` file should import `getRandomQuizzes` from `quizzes.js`.
* [x] create a react app 
* [x] Add test for quiz

## Part 4

* [x] Create a new file called `match.jsx`.
* [x] The component `<Match/>` will deal with rendering a quiz,  
      whereas the component `<App/>` in `index.jsx`  
      simply uses `<Match/>` and calls `ReactDOM.render()`.
* [x] Create a new `match-test.jsx` test file for the `<Match/>` component.


## Part 5
* [x] In `client`, create a new `home.jsx`. This should be your home page, with a welcome message,  
  and a button to go to the `match.jsx` page to a start a new match.
* [x] React routes between those 2 web pages.
  * [x] Also handle the case of *404 not found*.

* [x] In `server`, configure a *NodeJS* server with *Express*. It should server static assets 
  from the `public` folder, and `index.html` for `404 not found` cases.
  
* [x] Update your tests to accommodate all the changes done in your frontend code.  
  Add new tests in `match-test.jsx` to achieve 100% code coverage.
  
* [x] In `match.jsx`, handle an actual game with *n* quizzes (e.g., *n=3*).
  Instead of using `alert()`, now display a victory/defeat message in the page,
  with a button to start a new match.
  Starting a new match will create a new selection of *n* quizzes.
  When you display a quiz, you should also display its index in *n*, i.e., if *n=3*,
  then for example for the first quiz you should display that it is the 1st out of 3.

* [x] add test for coverage

## Part 8

* [x] In your backend, you need to write a REST API to deal with quizzes. Given a list of existing
  quizzes, at this point you just need to have a `POST` endpoint dealing with the selection
  and retrieval of a random sample of quizzes (e.g., 3).
  When in the frontend React app you need to start a new match, you will need to connect
  to the REST API to get a random sample of quizzes for such match
  
* [x] Add at least one test for your REST API using the `SuperTest` library.    
  Update all your frontend tests in a way that, when they need to do a `fetch` to the
  backend, then they should use `SuperTest` to connect to the backend (i.e., by using the utils
  shown in class to define behavior of `fetch` when running tests in NodeJS).
  Add enough tests to obtain an overall statement coverage of at least 70%.
  

## Part 9

* [ ] express-session
* [ ] passport
* [ ] passport-local

In the REST API, you need new endpoints to handle auth actions like:
* [ ] header-bar
* [ ] login
* [ ] signup
* [ ] logout
* [ ] Update your frontend React pages to support auth.

[ ] You also need an endpoint to retrieve the current info on the logged-in
user: id, and numbers of victories and defeats.

Note 1: you must NOT return the password in the user-info endpoint...

[ ] Add `SuperTest` tests for the auth API. Most of them will just be adaptations
from the tests used in the lesson examples. 

[ ] The starting of a match should only be possible if a user is logged-in.