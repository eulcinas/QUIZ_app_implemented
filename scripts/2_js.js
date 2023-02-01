// VARIABLES
const wrapperElement = document.querySelector('.wrapper');
const startBtnElement = document.querySelector('#start-btn');
const nextBtnElement = document.querySelector('#next-btn');
const quizQuestionElement = document.querySelector('.quiz__question');
const questionElement = document.querySelector('#question');
const answerBtnsElement = document.querySelector('#answers-btns');
const resultElement = document.querySelector('#result');
//! selecting new p tag from css for question counter
const currentQuestion = document.querySelector('#question-counter');
//! selecting the progress bar
const progressBar = document.querySelector('#progress-bar');
const progressBarFull = document.getElementById('progressBarFull');
//! difficulty selection buttons
const easyLevelButton = document.getElementById('easy-level');
const mediumLevelButton = document.getElementById('medium-level');
const hardLevelButton = document.getElementById('hard-level');
const infoTable = document.querySelector('#infoTable');
const spanTextEasy = document.querySelector('#span-text-easy');
const spanTextMedium = document.querySelector('#span-text-medium');
const spanTextHard = document.querySelector('#span-text-hard');
//! timer variables
const headerTimer = document.querySelector('#timer-header');
const timer = document.querySelector('#timer');

let questions = [];
let index;
let score = 0;

// FUNCTIONS

// -- starting quiz (after pressing "START QUIZ")
const startQuiz = () => {
  startBtnElement.classList.add('hide');

  quizQuestionElement.classList.remove('hide');

  progressBar.classList.remove('hide');

  if (!resultElement.classList.contains('hide')) {
    resultElement.classList.add('hide');
    score = 0;
  }

  resetState();

  index = 0;

  selectDifficulty();
  setNextQuestion();
};

//! -- selecting difficulty
const selectDifficulty = () => {
  infoTable.classList.remove('hide');
  timer.classList.remove('hide');

  startBtnElement.classList.add('hide');

  //! events for selecting difficulty
  easyLevelButton.addEventListener('click', (e) => {
    let countdown = questions.length * 30;
    setInterval(() => {
      if (index + 1 == questions.length) {
        answerBtnsElement.addEventListener('click', () => {
          timer.remove();
        });
      }
      if (countdown < 0) {
        questionElement.classList.add('hide');
        answerBtnsElement.classList.add('hide');
        nextBtnElement.classList.add('hide');
        resultElement.classList.remove('hide');
        resultElement.classList.add('time-end-text');
        resultElement.innerText = `Your time has ended! You scored ${score} points.`;
      } else {
        const minutes = Math.floor(countdown / 60);
        const seconds = `0${countdown % 60}`.slice(-2);
        timer.innerHTML = `${minutes}:${seconds}`;
        countdown--;
      }
    }, 1000);
    clearInterval();
    startQuiz();
  });

  mediumLevelButton.addEventListener('click', (e) => {
    let countdown = questions.length * 20;
    setInterval(() => {
      if (index + 1 == questions.length) {
        answerBtnsElement.addEventListener('click', () => {
          timer.remove();
        });
      }
      if (countdown < 0) {
        questionElement.classList.add('hide');
        answerBtnsElement.classList.add('hide');
        nextBtnElement.classList.add('hide');
        resultElement.classList.remove('hide');
        resultElement.classList.add('time-end-text');
        resultElement.innerText = `Your time has ended! You scored ${score} points.`;
      } else {
        const minutes = Math.floor(countdown / 60);
        const seconds = `0${countdown % 60}`.slice(-2);
        timer.innerHTML = `${minutes}:${seconds}`;
        countdown--;
      }
    }, 1000);
    clearInterval();
    startQuiz();
  });

  hardLevelButton.addEventListener('click', (e) => {
    let countdown = questions.length * 10;
    setInterval(() => {
      if (index + 1 === questions.length) {
        answerBtnsElement.addEventListener('click', () => {
          timer.remove();
        });
      }
      if (countdown < 0) {
        questionElement.classList.add('hide');
        answerBtnsElement.classList.add('hide');
        nextBtnElement.classList.add('hide');
        resultElement.classList.remove('hide');
        resultElement.classList.add('time-end-text');
        resultElement.innerText = `Your time has ended! You scored ${score} points.`;
      } else {
        const minutes = Math.floor(countdown / 60);
        const seconds = `0${countdown % 60}`.slice(-2);
        timer.innerHTML = `${minutes}:${seconds}`;
        countdown--;
      }
    }, 1000);
    clearInterval();
    startQuiz();
  });
};

// -- resetting "NEXT QUESTION" button and setting new question
const setNextQuestion = () => {
  resetState();
  showQuestion(questions[index]);
};

// -- selecting answer (by clicking on it's button)
const selectAnswer = (e) => {
  const correct = e.target.dataset.correct;

  if (correct) {
    e.target.classList.add('btn-correct');
    e.target.innerHTML += ` <i class="fas fa-check-circle"></i>`;
    score++;
  } else {
    e.target.classList.add('btn-wrong');
    e.target.innerHTML += ` <i class="fas fa-times-circle"></i>`;
  }

  Array.from(answerBtnsElement.children).forEach((x) => {
    x.disabled = true;
  });

  if (questions.length > index + 1) {
    nextBtnElement.classList.remove('hide');
  } else {
    startBtnElement.innerText = 'RESTART QUIZ';
    startBtnElement.classList.remove('hide');

    resultElement.classList.remove('hide');

    //! hiding quiz questions after everything is answered
    quizQuestionElement.classList.add('hide');

    if (score / questions.length === 1) {
      resultElement.innerHTML = `Correct answers: ${score} from ${questions.length}. You're a JavaScript <i class="fas fa-star"></i>`;
      currentQuestion.innerText = '';
    } else {
      resultElement.innerText = `Correct answers: ${score} from ${questions.length}.`;
      currentQuestion.innerText = '';
    }
  }
};

// -- showing question and answers from questions array
const showQuestion = ({ question, answers }) => {
  questionElement.innerText = question;

  //! adding the 'hide' class to difficulty selection buttons
  infoTable.classList.add('hide');
  headerTimer.classList.add('header');
  timer.classList.remove('hide');

  answers.forEach((answer) => {
    const button = document.createElement('button');

    button.innerText = answer.text;
    button.classList.add('btn', 'btn-js');

    if (answer.correct) button.dataset.correct = answer.correct;

    button.addEventListener('click', selectAnswer);

    answerBtnsElement.appendChild(button);
  });

  //! showing current question counter and hiding the counter when max value is reached
  currentQuestion.innerText = `Question ${index + 1} out of ${questions.length}`;

  //! Update the progress bar
  progressBarFull.style.width = `${((index + 1) / questions.length) * 100}%`;
};

// -- showing next question (after clicking "NEXT QUESTION" button)
const showNextQuestion = () => {
  index++;
  setNextQuestion();
};

// -- resetting "NEXT QUESTION" button and answers buttons
const resetState = () => {
  nextBtnElement.classList.add('hide');

  while (answerBtnsElement.firstChild) {
    answerBtnsElement.removeChild(answerBtnsElement.firstChild);
  }
};

// EVENTS
document.addEventListener('DOMContentLoaded', async () => {
  wrapperElement.style.backgroundColor = 'var(--js-color)';
  startBtnElement.style.backgroundColor = 'var(--js-color)';
  progressBar.style.borderColor = 'var(--js-color)';
  progressBarFull.style.backgroundColor = 'var(--js-color)';
  easyLevelButton.style.backgroundColor = 'var(--js-color)';
  mediumLevelButton.style.backgroundColor = 'var(--js-color)';
  hardLevelButton.style.backgroundColor = 'var(--js-color)';
  timer.style.color = 'var(--js-color)';
  spanTextEasy.classList.add('color-js');
  spanTextMedium.classList.add('color-js');
  spanTextHard.classList.add('color-js');

  const data = await (await fetch('../data/JS_questions.json')).json();
  questions = [...data];
});

startBtnElement.addEventListener('click', selectDifficulty);
nextBtnElement.addEventListener('click', showNextQuestion);
