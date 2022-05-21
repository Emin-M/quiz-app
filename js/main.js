/* Variables */
let questions = [];
let answers = [];
let trueAnswers = [];
let counter = 0;
let score = 0;
let color = false;
let progressBarPercentage = 0;
let time;
let finished = false;

/* HTML Selectors */
const timerHTML = document.querySelector(".timer");
const currentQuestion = document.querySelector(".currentQuestion");
const allQuestions = document.querySelector(".allQuestions");
const progressBar = document.querySelector(".pr");

/* Sounds */
const correctSound = new Audio("./sounds/Bing-sound.mp3");
const inCorrectSound = new Audio("./sounds/Wrong-answer.mp3");
const finishedSound = new Audio("./sounds/Ceremony.mp3");
const timerSound = new Audio("./sounds/Beep-sound.mp3");

/* Fetching Questions */
const fetchQuestions = async (url) => {
  let questionsJson = await fetch(url);
  let questions = await questionsJson.json();
  createQuestionAnswer(questions.results);
  setTimeout(() => {
    timer(time);
  }, 2000);
};

/* Spinner */
const spinner = () => {
  let down = document.querySelector(".down");
  down.innerHTML = "";

  let div = document.createElement("div");
  div.classList.add("spinner");
  down.appendChild(div);

  let spinner = document.querySelector(".spinner");

  spinner.innerHTML = `
              <div class="spinner-grow" role="status">
                  <span class="visually-hidden">Loading...</span>
              </div>`;
};

/* Working on API */
const createQuestionAnswer = (q) => {
  q.forEach((question) => {
    questions = [...questions, question.question];
    let answerArray = [question.correct_answer];
    question.incorrect_answers.forEach((incorrect) => {
      answerArray = [...answerArray, incorrect];
    });
    answers = [...answers, answerArray];
    trueAnswers = [...trueAnswers, question.correct_answer];
  });

  UI();
};

/* Setting Time */
const settingTime = (d, c) => {
  let ratio;
  if (d === "easy") {
    ratio = 13;
  } else if (d === "medium") {
    ratio = 17;
  } else if (d === "hard") {
    ratio = 25;
  } else {
    ratio = 20;
  }
  time = c * ratio;
};

/* UI */
const UI = () => {
  let container = document.querySelector(".questions");
  const ui = () => {
    if (counter >= questions.length) {
      return;
    }
    answers[counter].sort(() => 0.5 - Math.random());
    container.innerHTML = `
          <div>
              <h2>${questions[counter]}</h2>
              <button class="choice" onclick="UI(); check(this.innerHTML); colorCheck(this)">
              ${answers[counter][0]}</button>
              <button class="choice" onclick="UI(); check(this.innerHTML); colorCheck(this)">
              ${answers[counter][1]}</button>
              <button class="choice" onclick="UI(); check(this.innerHTML); colorCheck(this)">
              ${answers[counter][2]}</button>
              <button class="choice" onclick="UI(); check(this.innerHTML); colorCheck(this)">
              ${answers[counter][3]}</button>
          </div>
  `;
    currentQuestion.innerHTML = counter + 1;
    allQuestions.innerHTML = questions.length;
  };
  setTimeout(() => {
    ui();

    if (progressBarPercentage === 0) {
      progressBarPercentage = 100 / questions.length;
      progressBar.style.width = progressBarPercentage + "%";
    }
  }, 1500);
};

/* Checking Answer */
const check = (answer) => {
  if (answer.trim() === trueAnswers[counter].trim()) {
    setTimeout(() => {
      correctSound.play();
    }, 500);
    color = true;
    score++;
  } else {
    setTimeout(() => {
      inCorrectSound.play();
    }, 500);
    color = false;
  }

  progressBarPercentage = progressBarPercentage + 100 / questions.length;
  counter++;

  setTimeout(() => {
    progressBar.style.width = progressBarPercentage + "%";

    if (progressBarPercentage >= 101) {
      progressBar.style.width = "100%";
      finishGame();
    }
  }, 1500);
};

/* Answer Color */
const colorCheck = (e) => {
  let choices = document.querySelectorAll(".choice");
  choices.forEach((choice) => {
    choice.style.pointerEvents = "none";
  });

  setTimeout(() => {
    if (color) {
      e.classList.add("green");
    } else {
      e.classList.add("red");
      e.classList.add("shake");
      choices.forEach((choice) => {
        if (choice.innerHTML.trim() === trueAnswers[counter - 1]) {
          setTimeout(() => {
            choice.classList.add("green");
          }, 500);
        }
      });
    }
  }, 100);
};

/* Timer */
const timer = (t) => {
  let minute = Math.floor(t / 60);
  let seconds = "0" + (t % 60);

  if (t <= 0) {
    finishGame();
  } else if (t < 10) {
    timerHTML.classList.add("red");
    timerSound.play();
  } else if (t === time) {
    timerHTML.classList.remove("red");
  }

  timerHTML.innerHTML = minute + ":" + seconds.slice(-2);
  t--;

  let timerId = setTimeout(() => {
    timer(t);
  }, 1000);

  finished && clearInterval(timerId);
};

/* Finish Game */
const finishGame = () => {
  const finishModalTitle = document.querySelector(".modalFinishedTitle");
  const finishModalScore = document.querySelector(".finishModalScore");

  finishedSound.play();

  let title = "Better Luck Next Time!";

  if ((score / questions.length) * 100 >= 85) {
    title = "Congratulations!";
  } else if ((score / questions.length) * 100 >= 55) {
    title = "Good Game!";
  }

  toggleModalFinished();
  finished = true;

  finishModalTitle.innerHTML = title;
  finishModalScore.innerHTML = "Your Score : " + score + "/" + questions.length;
};

/* Restart Game */
const resetGame = () => {
  questions = [];
  answers = [];
  trueAnswers = [];
  counter = 0;
  score = 0;
  color = false;
  progressBarPercentage = 0;
  finished = false;
};

const restartGame = () => {
  resetGame();
  fetchQuestions(url);
  spinner();
};

const newGame = () => {
  let container = document.querySelector(".questions");
  resetGame();
  container.innerHTML = "";
  openModalCategory();
};
