let counter = document.getElementById("score");
const cookieBody = document.getElementById("cookie-body");
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// the canvas width & height, snake x & y, and the apple x & y, all need to be a multiples of the grid size in order for collision detection to work
// (e.g. 16 * 25 = 400)
var grid = 16;
var count = 0;

var snake = {
  x: 160,
  y: 160,

  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: grid,
  dy: 0,

  // keep track of all grids the snake body occupies
  cells: [],

  // length of the snake. grows when eating an apple
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};

// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {
  requestAnimationFrame(loop);

  // slow game loop to 15 fps instead of 60 (60/15 = 4)
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // move snake by it's velocity
  snake.x += snake.dx;
  snake.y += snake.dy;

  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});

  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // draw apple
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  // draw snake one cell at a time
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {

    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.x, cell.y, grid-1, grid-1);

    // snake ate apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      // canvas is 400x400 which is 25x25 grids
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {

      // snake occupies same space as a body part. reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
  // prevent snake from backtracking on itself by checking that it's
  // not already moving on the same axis (pressing left while moving
  // left won't do anything, and pressing right while moving left
  // shouldn't let you collide with your own body)

  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

const addOneToCounter = () => {
    cookieBody.innerHTML += `<p>Bro actually touched this cookie lmao<p>`;
    counter = document.getElementById("score");
    counter.innerText = parseInt(counter.innerText) + 1;
    if (counter.innerText > 50) { // if bro clicks more than 50 times it unleashes a surprise
        alert("You're weird bro, you've clicked this way too much. Time to play a new game.")
        cookieBody.innerHTML = ``;
        // start the game
        requestAnimationFrame(loop);
        
        // window.close(); // ima not do this since it's evil that was a previous idea if player clicks too many times tho
    }
}

document.addEventListener("DOMContentLoaded", () => {
  let cps = 1; // Cookies Per Second
  let goldenCookieActive = false;

  function updateCookieCount() {
      document.getElementById("score").innerText = `${parseInt(counter.innerText) + cps}`;
  }

  function spawnGoldenCookie() {
      if (goldenCookieActive) return; // if cookie already is gold

      if (Math.random() < 0.5) { // chance to spawn
          goldenCookieActive = true;

          const goldenCookie = document.createElement("div");
          goldenCookie.innerText = "🎁 Golden Cookie!";
          goldenCookie.style.position = "absolute";
          goldenCookie.style.top = `${Math.random() * 80 + 10}%`;
          goldenCookie.style.left = `${Math.random() * 80 + 10}%`;
          goldenCookie.style.padding = "10px";
          goldenCookie.style.backgroundColor = "gold";
          goldenCookie.style.borderRadius = "10px";
          goldenCookie.style.cursor = "pointer";
          goldenCookie.style.fontSize = "18px";
          goldenCookie.style.fontWeight = "bold";
          goldenCookie.style.zIndex = "1000";

          document.body.appendChild(goldenCookie);

          goldenCookie.addEventListener("click", () => {
              cps *= 10; // 10x cookies per second boost
              setTimeout(() => cps /= 10, 10000); 
              document.body.removeChild(goldenCookie);
              goldenCookieActive = false;
          });

          setTimeout(() => {
              if (document.body.contains(goldenCookie)) {
                  document.body.removeChild(goldenCookie);
                  goldenCookieActive = false;
              }
          }, 5000); // Remove if not clicked in 5 seconds
      }
  }

  setInterval(updateCookieCount, 5000);
  setInterval(spawnGoldenCookie, 30000);
});
