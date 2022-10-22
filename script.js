const clickStart = document.querySelector('.button')
const square = 32
const rowline = 16
const canvas = document.querySelector('#snake')
let container = canvas.getContext('2d')

let bottom = document.querySelector('.bottom')
bottom.style.display = 'none'

let snake = []
snake[0] = {
    x: 2 * square,
    y: 2 * square
}

let direction = 'right'

let food = {
    x: Math.floor(Math.random() * 15 + 1) * square,
    y: Math.floor(Math.random() * 15 + 1) * square
}

function createBG(){
    container.fillStyle = '#00008B'
    container.fillRect(0, 0, square * rowline, square * rowline)
}

function createSnake(){
    for(i = 0; i < snake.length; i++){
        container.fillStyle = 'aqua'
        container.fillRect(snake[i].x, snake[i].y, square, square)
    }
}

function createFood(){
    container.fillStyle = 'red'
    container.fillRect(food.x, food.y, square, square)
}

function movePress(e){
    if(e.keyCode == 37 && direction != 'right') direction = 'left'
    if(e.keyCode == 38 && direction != 'down') direction = 'up'
    if(e.keyCode == 39 && direction != 'left') direction = 'right'
    if(e.keyCode == 40 && direction != 'up') direction = 'down'
}

function moveAction(){
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction == 'right') snakeX += square
    if(direction == 'left') snakeX -= square
    if(direction == 'up') snakeY -= square
    if(direction == 'down') snakeY += square

    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    } else{
        food.x = Math.floor(Math.random() * 15 + 1) * square
        food.y = Math.floor(Math.random() * 15 + 1) * square
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
}

function rules(){
    if(snake[0].x > 16 * square && direction == 'right') snake[0].x = 0
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * square
    if(snake[0].y > 16 * square && direction == 'down') snake[0].y = 0
    if(snake[0].y < 0  && direction == 'up') snake[0].y = 16 * square
}

function verifyCollision(){
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(start)
            console.log('jogo acabou fdp')
            window.alert('acabou klein')
        } 
    }
}

function startGame(){
    bottom.style.display = 'block'
    rules()
    verifyCollision()
    createBG()
    createSnake()
    createFood()
    document.addEventListener('keydown', movePress)
    moveAction()
}

clickStart.addEventListener('click', function(){
    setInterval(startGame, 150)
})