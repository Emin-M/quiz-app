/* Start Modals */
const modalCategory = document.querySelector(".modalCategory");
const modalDiffuculty = document.querySelector(".modalDiffuculty");
const categorySelect = document.querySelector(".categorySelect");
const difficultySelect = document.querySelector(".difficultySelect");
const countSelect = document.querySelector("#inputE");
const btnCategoryNext = document.querySelector(".btn-category-next");
const btnPrevius = document.querySelector(".btn-previus");
const btnStart = document.querySelector(".btn-start");

const openModalCategory = () => {
  modalCategory.classList.add("modal-show");
};

openModalCategory();

const closeModalCategory = () => {
  modalCategory.classList.remove("modal-show");
  modalDiffuculty.classList.add("modal-show");
};

const openModalDifficulty = () => {
  modalDiffuculty.classList.add("modal-show");
};

const closeModalDifficulty = () => {
  modalDiffuculty.classList.remove("modal-show");
};

btnCategoryNext.addEventListener("click", () => {
  closeModalCategory();
  openModalDifficulty();
});

btnPrevius.addEventListener("click", () => {
  openModalCategory();
  closeModalDifficulty();
});

btnStart.addEventListener("click", () => {
  const category = categorySelect.value;
  const difficulty = difficultySelect.value;
  const count = countSelect.value;

  closeModalCategory();
  closeModalDifficulty();

  urlFormatter(category, difficulty, count);
});

/* Finishing Modals */
const modalFinished = document.querySelector(".modalFinished");
const btnNewGame = document.querySelector(".btn-new-game");
const restart = document.querySelector(".btn-restart");

const toggleModalFinished = () => {
  modalFinished.classList.toggle("modal-show");
};

restart.addEventListener("click", () => {
  restartGame();
  toggleModalFinished();
});

btnNewGame.addEventListener("click", () => {
  newGame();
  toggleModalFinished();
});
