//gme constants & Variables
 c=console.log.bind("");
let inputDir ={x:0,y:0};
const foodSound =new Audio('./music/food.mp3');
const gameOverSound =new Audio('./music/gameover.mp3');
const moveSound =new Audio('./music/move.mp3');
const musicSound =new Audio('./music/music.mp3');
let speed =6;
let score=0;
let lastPaintTime =0;
let snakeArr = [ { x:13, y:15} ];
let food  =  { x:10, y:10};




// Game Functions
 main= (ctime)=>{
    window.requestAnimationFrame(main);
  
   // c(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed) return;
     
    lastPaintTime=ctime;
    gameEngine();
 }

 function isCollide(snake){
   // if snake cut itself

   for (let i = 1; i < snakeArr.length; i++) {
    if(snake[i].x=== snake[0].x && snake[i].y=== snake[0].y){
        return true;
    }}

    // wall crash
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0  ){
        return true;
    }
   


 }

  


 function gameEngine(){
    //Part 1: Updating thee snake array & Food 
    musicSound.play();
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir ={x:0,y:0};
        alert("Game Over. Press Any key to play again.");
        snakeArr=[{x:13, y:15}];
        musicSound.play();
        score=0;

    }

// food position
if((snakeArr[0].y)=== food.y && (snakeArr[0].x)=== food.x){
    foodSound.play();
    score+=5;
    if(score>hiscoreval){
        hiscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify( hiscoreval));
        highScoreBox.innerHTML="<h3>"+"Highscore: "+ hiscoreval+"<h3>";
    }
    speed= 6+score/10;
    scoreBox.innerHTML="Score: "+score;
    
    console.log(speed);
    snakeArr.unshift({x: snakeArr[0].x +inputDir.x,y: snakeArr[0].y +inputDir.y})
    let a= 2;
    let b=16;
    food ={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
}

 // Moving the snake
 for (let i = snakeArr.length - 2; i>=0; i--) { 
    snakeArr[i+1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

// Part 2: Display the snake and Food
// Display the snake
board.innerHTML = "";
snakeArr.forEach((e, index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if(index === 0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
    });

    //Display the food 

    foodElement=document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

 }









//main logic starts here
let hiscore=localStorage.getItem("hiscore");
 if(hiscore===null){
   var hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
 }
 else{
    hiscoreval= JSON.parse(hiscore);
    highScoreBox.innerHTML="<h3>"+"Highscore: "+ hiscore+"<h3>";
 }


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}  //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            c("ArrowUp");
            inputDir.x =0;
            inputDir.y =-1;
            break;
            case "ArrowDown":
                c("ArrowDown");
                inputDir.x =0;
                inputDir.y =1;
                break;
            case "ArrowLeft":
                    c("ArrowLeft");
                    inputDir.x =-1;
                    inputDir.y =0;
                    break;
             case "ArrowRight":
                        c("ArrowRight");
                        inputDir.x =1;
                        inputDir.y =0;
                        break;
    }

});