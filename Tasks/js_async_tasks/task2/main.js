let startBtn = document.getElementById("start-btn");
let timeDisplay = document.getElementById("time");
let box = document.getElementById("box");
let resultMessage = document.getElementById("result-message");
let options = document.querySelectorAll(".option-btn");

let timeLeft = 10;
let timer;
let gameStarted = false;

function startGame() {
  timeLeft = 10;
  timeDisplay.textContent = `Time: ${timeLeft}`;
  box.style.display = "block";
  resultMessage.textContent = "";
  resultMessage.style.display = "none";

  if (gameStarted) {
    clearInterval(timer);
  }

  timer = setInterval(updateTime, 1000);
  gameStarted = true;
}

function updateTime() {
  if (timeLeft <= 4) {
    timeDisplay.style.color = "red";
    timeDisplay.style.fontWeight = "900";
  }

  if (timeLeft > 0) {
    timeLeft--;
    timeDisplay.textContent = `Time: ${timeLeft}`;
  } else {
    clearInterval(timer);
    resultMessage.textContent = "Time is up!";
    resultMessage.style.color = "pink";
    resultMessage.style.display = "block";
    setTimeout(resetGame, 2000);
  }
}

function correctAnswer() {
  clearInterval(timer);
  resultMessage.textContent = "Correct answer!";
  resultMessage.style.color = "green";
  resultMessage.style.display = "block";
  setTimeout(resetGame, 2000);
}

function incorrectAnswer() {
  clearInterval(timer);
  resultMessage.textContent = "Incorrect answer!";
  resultMessage.style.color = "red";
  resultMessage.style.display = "block";
  setTimeout(resetGame, 2000);
}

function resetGame() {
  box.style.display = "none";
  resultMessage.style.display = "none";
  timeDisplay.style.color = "#4caf50";
  timeDisplay.style.fontWeight = "100";
  gameStarted = false;
}

startBtn.addEventListener("click", startGame);

document.getElementById("option-a").addEventListener("click", incorrectAnswer);
document.getElementById("option-b").addEventListener("click", correctAnswer);
document.getElementById("option-c").addEventListener("click", incorrectAnswer);
document.getElementById("option-d").addEventListener("click", incorrectAnswer);
document.getElementById("option-e").addEventListener("click", incorrectAnswer);
