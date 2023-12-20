// initial snake position
let snake = [{ x: 10, y: 10 }];

// score

let score = 0;
let highScore = 0;

// makes the snake at given array of positions

let drawSnake = () => {
  snake.forEach((segment) => {
    let snakeCell = document.querySelector(
      `.grid-item:nth-child(${segment.x + segment.y * boardSize})`
    );
    if (snakeCell) snakeCell.classList.add('snake');
  });
};

// erases the snake at given array of positions

let eraseSnake = () => {
  snake.forEach((segment) => {
    let snakeCell = document.querySelector(
      `.grid-item:nth-child(${segment.x + segment.y * boardSize})`
    );
    if (snakeCell) snakeCell.classList.remove('snake');
  });
};

// Snake movement for one space
let id;
function moveSnake1Space(xChange, yChange) {
  const newHead = {
    x: snake[0].x + xChange,
    y: snake[0].y + yChange,
  };

  // Checks if  new head collides with the wall
  if (
    newHead.x < 1 ||
    newHead.x > boardSize ||
    newHead.y < 0 ||
    newHead.y > boardSize - 1 ||
    snake.includes(newHead)
  ) {
    gameOver();
    return;
  }
  eraseSnake();

  // Check if the new head collides with the food
  if (newHead.x === food.x && newHead.y === food.y) {
    snake.unshift(newHead);
    score++;
    document.getElementById('score').innerHTML = score;
    document.querySelector('.food').classList.remove('food');
    drawFood();
  } else {
    // Remove the tail of the snake and add the new head to the front
    snake.pop();
    snake.unshift(newHead);
  }
  drawSnake();
}

// continuous movement
let xChange = 0;
let yChange = 0;

let moveSnakeInt = () => {
  id = setInterval(() => {
    moveSnake1Space(xChange, yChange);
  }, 500);
};

// Checks for direction of arrows of keys

let dir = (event) => {
  switch (event.key) {
    case 'ArrowUp':
      xChange = 0;
      yChange = -1;
      break;
    case 'ArrowDown':
      xChange = 0;
      yChange = 1;
      break;
    case 'ArrowLeft':
      xChange = -1;
      yChange = 0;
      break;
    case 'ArrowRight':
      xChange = 1;
      yChange = 0;
      break;
  }
};

document.addEventListener('keydown', dir);

// Food

let food = { x: 0, y: 0 };

// draws food at random places
function drawFood() {
  let x = Math.floor(Math.random() * boardSize) + 1;
  let y = Math.floor(Math.random() * boardSize);

  food = {
    x: x,
    y: y,
  };
  eraseFood();

  let foodCell = document.querySelector(
    `.grid-item:nth-child(${food.x + food.y * boardSize})`
  );
  foodCell.classList.add('food');

  // check if snake body is present at the food location
  if (foodCell.classList.contains('snake')) drawFood();
}
let eraseFood = () => {
  let foodCell = document.querySelector(`.food`);
  if (foodCell) {
    foodCell.classList.remove('food');
    eraseFood();
  }
};

// High Score

let setHighScore = () => {
  if (score > highScore) {
    highScore = score;
    document.getElementById('high-score').innerHTML = highScore;
  }
};

// game over

let gameOver = () => {
  const finalScore = document.getElementById('final-score');
  finalScore.textContent = score;

  const modal = document.getElementById('game-over-modal');
  modal.style.display = 'flex';
};

document
  .getElementById('restart-button')
  .addEventListener('click', function () {
    reset();
    document.getElementById('game-over-modal').style.display = 'none';
  });

let reset = () => {
  clearInterval(id);
  eraseSnake();
  setHighScore();
  snake = [{ x: 10, y: 10 }];
  xChange = 0;
  yChange = 0;
  score = 0;
  document.getElementById('score').innerHTML = score;
  drawSnake();
  drawFood();
  moveSnakeInt();
};

reset();
