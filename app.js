// Game constant & variable

const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music//music.mp3");
const board = document.getElementById("board");

let lastPaintTime = 0;
let speed = 13;
let score = 0;
let scoreDiv = document.getElementById("score");
let highscore = document.getElementById("highscore");
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 10, y: 12 };
let inpDirection = { x: 0, y: 0 };

// Game Functions

function main(cTime) {
  window.requestAnimationFrame(main);

  if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = cTime;
  gameEngine();
}

function isCollide(snakeArr) {
  // if snake bump into itelf
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  // if snake bump into wall
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  // part 1: update the snake array

  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inpDirection = { x: 0, y: 0 };
    scoreDiv.innerHTML = `Score : ${0}`;
    alert("Game Over Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  // if snake has eaten the food, increase score and regenarate the food

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hScoreVal) {
      hScoreVal = score;
      localStorage.setItem("hScore", JSON.stringify(hScoreVal));
      highscore.innerHTML = `High Score : ${hScoreVal}`;
    }
    scoreDiv.innerHTML = `Score : ${score}`;
    snakeArr.unshift({
      x: snakeArr[0].x + inpDirection.x,
      y: snakeArr[0].y + inpDirection.y,
    });
    let a = 2;
    let b = 15;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
 
  snakeArr[0].x += inpDirection.x;
  snakeArr[0].y += inpDirection.y;


  // part 2: display the snake:
  board.innerHTML = "";
  snakeArr.forEach((el, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = el.y;
    snakeElement.style.gridColumnStart = el.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // display the food:
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// main logic starts here

// high score functionality
let hScore = localStorage.getItem("hScore");
if (hScore == null) {
  let hScoreVal = 0;
  localStorage.setItem("hScore", JSON.stringify(hScoreVal));
} else {
  hScoreVal = JSON.parse(hScore);
  highscore.innerHTML = `Hign Score : ${hScore}`;
}

musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inpDirection = { x: 0, y: 1}; // start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inpDirection.x = 0;
      inpDirection.y = -1;
      break;
    case "ArrowDown":
      inpDirection.x = 0;
      inpDirection.y = 1;
      break;
    case "ArrowLeft":
      inpDirection.x = -1;
      inpDirection.y = 0;
      break;
    case "ArrowRight":
      inpDirection.x = 1;
      inpDirection.y = 0;
      break;
  }
});
