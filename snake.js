let snake = [{ x: 10, y: 10 }];

let score = 0;

let drawSnake = () => {
  snake.forEach((segment) => {
    if (
      segment.x < 1 ||
      segment.x > boardSize ||
      segment.y < 0 ||
      segment.y > boardSize - 1
    ) {
      alert('Game Over');
      location.reload();
    }
    let snakeCell = document.querySelector(
      `.grid-item:nth-child(${segment.x + segment.y * boardSize})`
    );
    snakeCell.classList.add('snake');
  });
  checkFood();
};
drawSnake();

// Snake movement

let moveSnakeUp = () => {
  let snakeCell = document.querySelector(
    `.grid-item:nth-child(${snake[0].x + snake[0].y * boardSize})`
  );
  snakeCell.classList.remove('snake');
  snake.unshift({ x: snake[0].x, y: snake[0].y - 1 });
  snake.pop();
  drawSnake();
};

let moveSnakeDown = () => {
  let snakeCell = document.querySelector(
    `.grid-item:nth-child(${snake[0].x + snake[0].y * boardSize})`
  );
  snakeCell.classList.remove('snake');
  snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
  snake.pop();
  drawSnake();
};

let moveSnakeLeft = () => {
  let snakeCell = document.querySelector(
    `.grid-item:nth-child(${snake[0].x + snake[0].y * boardSize})`
  );
  snakeCell.classList.remove('snake');
  snake.unshift({ x: snake[0].x - 1, y: snake[0].y });
  snake.pop();
  drawSnake();
};

let moveSnakeRight = () => {
  let snakeCell = document.querySelector(
    `.grid-item:nth-child(${snake[0].x + snake[0].y * boardSize})`
  );
  snakeCell.classList.remove('snake');
  snake.unshift({ x: snake[0].x + 1, y: snake[0].y });
  snake.pop();
  drawSnake();
};

let moveSnake = (event) => {
  switch (event.key) {
    case 'ArrowUp':
      moveSnakeUp();
      break;
    case 'ArrowDown':
      moveSnakeDown();
      break;
    case 'ArrowLeft':
      moveSnakeLeft();
      break;
    case 'ArrowRight':
      moveSnakeRight();
      break;
  }
};

document.addEventListener('keydown', moveSnake);

// Food

let drawFood = () => {
  let food = Math.floor(Math.random() * boardSize * boardSize);
  let foodCell = document.querySelector(`.grid-item:nth-child(${food})`);
  foodCell.classList.add('food');
};

drawFood();

function checkFood() {
  let snakeHead = snake[0];
  let foodCell = document.querySelector(
    `.grid-item:nth-child(${snakeHead.x + snakeHead.y * boardSize})`
  );
  if (foodCell.classList.contains('food')) {
    foodCell.classList.remove('food');
    drawFood();
    score++;
    document.getElementById('score').innerHTML = score;
  }
}
