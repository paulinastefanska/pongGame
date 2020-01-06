const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// set canvas sizes
canvas.width = 1000;
canvas.height = 500;

const canWidth = canvas.width;
const canHeight = canvas.height;

// ball sizes
const ballSize = 15;
let ballX = canWidth / 2 - ballSize / 2;
let ballY = canHeight / 2 - ballSize / 2;

// racket sizes
const racketHeight = 100;
const racketWidth = 20;

// rackets positions
const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

// net sizes
const lineWidth = 6;
const lineHeight = 16;

// ball speed
let ballSpeedX = 4;
let ballSpeedY = 4;

// draw rackets
function player() {
  ctx.fillStyle = "#00b894";
  ctx.fillRect(playerX, playerY, racketWidth, racketHeight);
}

function ai() {
  ctx.fillStyle = "#ff7675";
  ctx.fillRect(aiX, aiY, racketWidth, racketHeight);
}

function ball() {
  // draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // top / bottom
  if (ballY <= 0 || ballY + ballSize >= canHeight) {
    ballSpeedY = -ballSpeedY;
    speedUp();
  }

  // left / right
  if (ballX <= 0) {
    clearInterval(runGame);
    alert("GAME OVER - Computer WON!");
    startNew();
  } else if (ballX + ballSize >= canWidth) {
    clearInterval(runGame);
    alert("GAME OVER - You WON!");
    startNew();
  }

  // rackets hits
  if (
    ballX <= playerX + racketWidth &&
    ballY + ballSize / 2 >= playerY &&
    ballY + ballSize / 2 <= playerY + racketHeight
  ) {
    ballX += 5;
    ballSpeedX = -ballSpeedX;
    speedUp();
  }

  if (
    ballX + ballSize >= aiX &&
    ballY + ballSize / 2 >= aiY &&
    ballY + ballSize / 2 <= aiY + racketHeight
  ) {
    ballX -= 5;
    ballSpeedX = -ballSpeedX;
    speedUp();
  }
}

function table() {
  // draw table
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canWidth, canHeight);
  // draw center line - net
  for (let linePosition = 20; linePosition < canHeight; linePosition += 30) {
    ctx.fillStyle = "grey";
    ctx.fillRect(
      canWidth / 2 - lineWidth / 2,
      linePosition,
      lineWidth,
      lineHeight
    );
  }
}

// set variables to beginning qty
function startNew() {
  playerY = 200;
  aiY = 200;
  ballX = canWidth / 2 - ballSize / 2;
  ballY = canHeight / 2 - ballSize / 2;
  ballSpeedX = 4;
  ballSpeedY = 4;
}

// canvas distance from the top
topCanvas = canvas.offsetTop;

// set moving limit
function playerPosition(e) {
  playerY = e.clientY - topCanvas - racketHeight / 2;

  if (playerY >= canHeight - racketHeight) {
    playerY = canHeight - racketHeight;
  }

  if (playerY <= 0) {
    playerY = 0;
  }
}

// ball speed grow
function speedUp() {
  if (ballSpeedX > 0 && ballSpeedX < 14) {
    ballSpeedX += 0.2;
  } else if (ballSpeedX < 0 && ballSpeedX > -14) {
    ballSpeedX -= 0.2;
  }

  if (ballSpeedY > 0 && ballSpeedY < 14) {
    ballSpeedY += 0.2;
  } else if (ballSpeedY < 0 && ballSpeedY > -14) {
    ballSpeedY -= 0.2;
  }
}

// set computer move
function aiPosition() {
  const racketCenter = aiY + racketHeight / 2;
  const ballCenter = ballY + ballSize / 2;

  if (ballX > 500) {
    if (racketCenter - ballCenter > 200) {
      aiY -= 25;
    } else if (racketCenter - ballCenter > 50) {
      aiY -= 15;
    } else if (racketCenter - ballCenter < -200) {
      aiY += 25;
    } else if (racketCenter - ballCenter < -50) {
      aiY += 15;
    }
  } else if (ballX <= 500 && ballX > 150) {
    if (racketCenter - ballCenter > 100) {
      aiY -= 5;
    } else if (racketCenter - ballCenter < 100) {
      aiY += 5;
    }
  }
}

canvas.addEventListener("mousemove", playerPosition);

// draw all game
function game() {
  table();
  ball();
  player();
  ai();
  aiPosition();
}

function runGame() {
  setInterval(game, 1000 / 60);
}
runGame();
