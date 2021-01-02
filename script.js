let y = 0; // y coordinate of the ball 
let x; // x- coordinate of the ball 
let vy = 0; // velocity
let radius; 
let rectWidth; 
let vx = 1; 
let g = 0.1; //gravity
let gap; 
let distancePipe = 175; 
let pipeArray = []; // array to hold (x_coordinate, y_coordinate)
let gameOver; 

function setup(){
  createCanvas(450,450);
  y = height/2; 
  x = width/3; 
  radius = 15; 
  rectWidth = 30; 
  gameOver = false; 
  // initialize pipeArray with first pipe
  pipeArray.push([width-10, 2*height/3]);
  gap = 1/3 * height;
  
}

function draw(){
  // draw() 60 times per second. 
  background(220);
  intersection(); 

  if( (y+radius) >= height){
    gameOver = true; 
  }

  if (gameOver){
    pipeArray = [];
    setup(); 
    return; 
  }
  // Drawing
  fill(color('white')); 
  circle(x,y,radius*2);
  for(let i = 0; i < pipeArray.length; i++){
    fill(color('black')); 
    rect(pipeArray[i][0], 0, rectWidth, pipeArray[i][1] - gap);
    rect(pipeArray[i][0], pipeArray[i][1], rectWidth, height - pipeArray[i][1]);
  }

  // Update the state 
  if(pipeArray[pipeArray.length-1][0] <= distancePipe){
    // create a new rect
    let prevX = pipeArray[pipeArray.length-1][0];
    let yRamdom = random(1/3 * height, height);
    pipeArray.push([width - 10, yRamdom]);
  }
  for (let i = 0; i < pipeArray.length; i++){
    pipeArray[i][0] -= vx; 
  }

  vy += g; 
  y += vy;
}

function keyPressed(){
  vy = -3; 
  keyIsPressed = true;  
  intersection(); 
}

function mousePressed(){
  vy = -3;
  intersection();  
}

function intersection(){
  for (let i = 0; i < pipeArray.length; i++){
    if (((x + radius) >= pipeArray[i][0]) && ((x-radius) <= (pipeArray[i][0] + rectWidth))){
      if((y - radius) <= (pipeArray[i][1] - gap) || (y + radius) >= pipeArray[i][1] || (y + radius)  >= height){
      gameOver = true; 
      return; 
    }
    }
  }
}