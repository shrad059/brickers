const grid=document.querySelector('.grid')
const scoreDisplay= document.getElementById("score")
const status= document.getElementById("scoreTit")
const userPosition= [230,10]
const currentPosition= userPosition
const body=document.getElementsByTagName('body')
const ballPosition= [270,30]
const ballCurrentPosition= ballPosition
const blockWidth =100
const blockHeight =20
const boardWidth=800
const boardHeight=670
const ballDiameter=10
let score=0
let timerId
let xDirection =2
let yDirection =2

class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft =[xAxis, yAxis]
        this.bottomRight =[xAxis+ blockWidth, yAxis]
        this.topLeft =[xAxis, yAxis+blockHeight]
        this.topRight =[xAxis+blockWidth, yAxis+blockHeight]
    }
}

const blocks=[
    new Block(10,630),
    new Block(120,630),
    new Block(230,630),
    new Block(340,630),
    new Block(450,630),
    new Block(570,630),
    new Block(690,630),
    new Block(10,590),
    new Block(120,590),
    new Block(230,590),
    new Block(340,590),
    new Block(450,590),
    new Block(570,590),
    new Block(690,590),
    new Block(10,550),
    new Block(120,550),
    new Block(230,550),
    new Block(340,550),
    new Block(450,550),
    new Block(570,550),
    new Block(690,550),
    new Block(10,510),
    new Block(120,510),
    new Block(230,510),
    new Block(340,510),
    new Block(450,510),
    new Block(570,510),
    new Block(690,510),
    new Block(10,470),
    new Block(120,470),
    new Block(230,470),
    new Block(340,470),
    new Block(450,470),
    new Block(570,470),
    new Block(690,470),
    new Block(10,430),
    new Block(120,430),
    new Block(230,430),
    new Block(340,430),
    new Block(450,430),
    new Block(570,430),
    new Block(690,430),
    new Block(10,390),
    new Block(120,390),
    new Block(230,390),
    new Block(340,390),
    new Block(450,390),  
    new Block(570,390),
    new Block(690,390),
     
]


function addBlocks(){
    for(let i=0; i<blocks.length; i++){
        const block= document.createElement('div')
        block.classList.add('block')
        block.style.left= blocks[i].bottomLeft[0] +'px'
        block.style.bottom=blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block)
    }
}
addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//add ball
const ball =document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//draw the user
function drawUser(){
    user.style.left=currentPosition[0]+'px'
    user.style.bottom=currentPosition[1]+'px'
}
function drawBall(){
    ball.style.left=ballCurrentPosition[0]+'px'
    ball.style.bottom=ballCurrentPosition[1]+'px'
}


//move user
function moveUser(e){
    switch(e.key){
        case 'a':
            if(currentPosition[0]>0){
                currentPosition[0]-=45
                drawUser()
            }
            break;
        case 'd':
            if(currentPosition[0]<boardWidth-blockWidth){
                currentPosition[0]+=45
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

//move ball
function moveBall(){
    ballCurrentPosition[0]+=xDirection
    ballCurrentPosition[1]+=yDirection
    drawBall()
    checkForCollision()
}
timerId=setInterval(moveBall,10)

//check for collision
function checkForCollision(){
    // block collision
    for(let i=0; i<blocks.length; i++){
        if(
            (ballCurrentPosition[0]>blocks[i].bottomLeft[0] && ballCurrentPosition[0]<blocks[i].bottomRight[0])&& ((ballCurrentPosition[1]+ballDiameter)> blocks[i].bottomLeft[1] && ballCurrentPosition[1]<blocks[i].topLeft[1])
        ){
            const allBlocks= Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()
            score++
            scoreDisplay.innerHTML=score

            //check for win
            if(blocks.length ===0){
                let winStat="YOU WIN"
                scoreDisplay.style.color("green")
                scoreDisplay.innerHTML=winStat
                clearInterval(timerId)
                document.removeEventListener('keydown')
            }
        }
    }

    //wall collision
    if(ballCurrentPosition[0]>=(boardWidth-ballDiameter) || 
    ballCurrentPosition[1]>=(boardHeight-ballDiameter)||
    ballCurrentPosition[0]<=0
    ){
        changeDirection()
    }
    //check for user collision
    if(
        (
            ballCurrentPosition[0]> currentPosition[0] && ballCurrentPosition[0]<currentPosition[0]+blockWidth
        )&&
        (
            ballCurrentPosition[1]>currentPosition[1] && ballCurrentPosition[1]<currentPosition[1]+blockHeight
        )
    ){
        changeDirection()
    }

    //game over
    if(ballCurrentPosition[1]===0){
        clearInterval(timerId)
        scoreDisplay.innerHTML="YOU LOSE"
        scoreDisplay.style.color="red"
        
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection(){
    if(xDirection===2 && yDirection===2){
        xDirection=-2
        return
    }
    if(xDirection===-2 && yDirection===2){
        yDirection=-2
        return
    }
    if(xDirection===-2 && yDirection===-2){
        xDirection=2
        return
    }
    if(xDirection===2 && yDirection===-2){
        yDirection=2
        return
    }

  
}