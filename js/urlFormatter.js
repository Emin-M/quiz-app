let url;
const urlFormatter = (category, difficulty, count) => {
  if (category === "any") {
    url = `https://opentdb.com/api.php?amount=${count}&difficulty=${difficulty}&type=multiple`;
  } else if (difficulty === "any") {
    url = `https://opentdb.com/api.php?amount=${count}&category=${category}&type=multiple`;
  } else if (category === "any" && difficulty === "any") {
    url = `https://opentdb.com/api.php?amount=${count}&type=multiple`;
  } else {
    url = `https://opentdb.com/api.php?amount=${count}&category=${category}&difficulty=${difficulty}&type=multiple`;
  }

  settingTime(difficulty, count);

  /* Starting Game */
  fetchQuestions(url);
  spinner();
};
