const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score"); //ERROR: el llamado al id estaba mal escrito

let foodX, foodY;
let gameOver = false;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score ${highScore}`;

const changeFoodPosition  = () => {
    foodX = Math.floor(Math.random() * 60) + 1;
    foodY = Math.floor(Math.random() * 60) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("GAME OVER!!");
    location.reload();
}

const changeDirection = (e) => {
    //console.log(e);

    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1){ //ERROR: las velocidades estaban mal establecidas
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    } 
    //initGame();
}

const initGame = () => {

    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if (snakeX === foodX && snakeY === foodY){
        changeFoodPosition(); //ERROR: no hicmos el llamado a la funcion donde se establece que la fruta debe aparecer de forma aleatoria cuando la serpientes pase encima de la misma.
        snakeBody.push([foodX, foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score ${highScore}`;
    }
    
    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;
    
    if (snakeX <= 0 || snakeX > 60 || snakeY <= 0 || snakeY > 60){
      htmlMarkup += `<audio autoplay>
        <source src="audio/perder.mp3" type="audio/mp3">
    </audio>`
        gameOver = true;
    }

    for (i = 0; i < snakeBody.length; i++){

    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
        gameOver = true;
    }
    }
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
//initGame();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);