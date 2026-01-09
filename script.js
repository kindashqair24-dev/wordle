const WORDS = [
"audio","press","media","video","radio","blogs","tweet","feeds","image","photo",
"viral","brand","story","click","views","reach","share","adobe","canon","nikon",
"codec","sound","pixel","layer","track","focus","print","paper","ethic","legal",
"frame","shoot","light","flash","color","chart","graph","stats","trend","cable",
"topic","alert","email","cloud","drive","posts","feeds","blogs","video","audio",
"radio","press","print","tweet","viral","reach","views","click","brand","story",
"photo","image","pixel","sound","track","codec","focus","frame","shoot","flash",
"light","words","media","newsr","white","black","datax","sound","radio","media"
];

let answer;
let currentRow;
let currentCol;
let gameOver;

const board = document.getElementById("board");
const message = document.getElementById("message");
const nextBtn = document.getElementById("nextRound");

let grid = [];

function createBoard() {
  board.innerHTML = "";
  grid = [];

  for (let r = 0; r < 6; r++) {
    const row = document.createElement("div");
    row.className = "row";
    grid[r] = [];

    for (let c = 0; c < 5; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      row.appendChild(cell);
      grid[r][c] = cell;
    }
    board.appendChild(row);
  }
}

function resetGame() {
  answer = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
  currentRow = 0;
  currentCol = 0;
  gameOver = false;
  message.textContent = "";
  nextBtn.style.display = "none";
  createBoard();
}

document.addEventListener("keydown", e => {
  if (gameOver) return;

  if (e.key === "Backspace" && currentCol > 0) {
    currentCol--;
    grid[currentRow][currentCol].textContent = "";
  }

  if (e.key === "Enter" && currentCol === 5) {
    submitGuess();
  }

  if (/^[a-zA-Z]$/.test(e.key) && currentCol < 5) {
    grid[currentRow][currentCol].textContent = e.key.toUpperCase();
    currentCol++;
  }
});

function submitGuess() {
  let guess = "";
  for (let c = 0; c < 5; c++) {
    guess += grid[currentRow][c].textContent;
  }

  if (!WORDS.includes(guess.toLowerCase())) {
    message.textContent = "Not in word list";
    return;
  }

  message.textContent = "";

  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      grid[currentRow][i].classList.add("correct");
    } else if (answer.includes(guess[i])) {
      grid[currentRow][i].classList.add("present");
    } else {
      grid[currentRow][i].classList.add("absent");
    }
  }

  if (guess === answer) {
    message.textContent = "🎉 You got it! Well done.";
    gameOver = true;
    nextBtn.style.display = "inline-block";
    return;
  }

  currentRow++;
  currentCol = 0;

  if (currentRow === 6) {
    message.textContent = `Good luck next time. The word was ${answer}`;
    gameOver = true;
    nextBtn.style.display = "inline-block";
  }
}

nextBtn.addEventListener("click", resetGame);

// start first round
resetGame();
