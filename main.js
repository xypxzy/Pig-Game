"use strict";
//Element selection
const score1Element = document.querySelector("#score-1");
const score2Element = document.querySelector("#score-2");
const current1Element = document.querySelector("#current-1");
const current2Element = document.querySelector("#current-2");

const player1Element = document.querySelector(".player-1");
const player2Element = document.querySelector(".player-2");

const diceElement = document.querySelector(".dice");

const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

//Game initial conditions
const switchActivePlayer = () => {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1Element.classList.toggle("active");
  player2Element.classList.toggle("active");
};

let totalScores, currentScore, activePlayer, isPlay;

const initGame = function () {
  currentScore = 0;
  activePlayer = 1;
  isPlay = true;
  totalScores = [0, 0];

  diceElement.classList.add("hidden");
  score1Element.textContent = 0;
  score2Element.textContent = 0;
  current1Element.textContent = 0;
  current2Element.textContent = 0;
  player1Element.classList.remove("player-winner");
  player2Element.classList.remove("player-winner");
  player1Element.classList.remove("active");
  player2Element.classList.remove("active");
  player1Element.classList.add("active");
};
initGame();

//Roll the Dice

btnRoll.addEventListener("click", () => {
  if (isPlay) {
    //Generate a random number
    let diceNum = Math.trunc(Math.random() * 6) + 1;

    //Display number on the dice
    diceElement.classList.remove("hidden");
    diceElement.src = `./img/dice${diceNum}.png`;
    /*//Realised with Switch-Case.
  switch (diceNum) {
    case 1:
      diceElement.src = "./img/dice1.png";
      break;
    case 2:
      diceElement.src = "./img/dice2.png";
      break;
    case 3:
      diceElement.src = "./img/dice3.png";
      break;
    case 4:
      diceElement.src = "./img/dice4.png";
      break;
    case 5:
      diceElement.src = "./img/dice5.png";
      break;
    case 6:
      diceElement.src = "./img/dice6.png";
      break;
  }*/
    //If the number is 1, switch to the next player

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (isPlay) {
    //Add current score to active player total score
    totalScores[activePlayer - 1] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      totalScores[activePlayer - 1];

    //If total score of active player >= 100, active player won, if not - switch active player
    if (totalScores[activePlayer - 1] >= 100) {
      isPlay = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("active");
      diceElement.classList.add("hidden");
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener("click", initGame);
