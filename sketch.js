var flappy;
var ground, invisibleGround, groundImage;

var obstacleup, obstacledown;
var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOverImg, restart;


function preload() {

  groundImage = loadImage("fondo.png");
  flappyImage = loadImage("flappy.gif");

  obstacle_down = loadImage("obstacle1.jpg");
  obstacle_up = loadImage("obstacle2.jpg");

  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");

  flySound = loadSound("fly.mp3");
  dieSound = loadSound("die.mp3");
}

function setup() {
createCanvas(800, 400);

  
//crear sprite de fondo
ground = createSprite(100,150);
ground.addImage("ground",groundImage);

invisibleGround= createSprite(200,390,400,10);

obstaclesGroup = new Group();

//crear sprite de Trex
flappy = createSprite(50,160,20,50);
flappy.addImage("running", flappyImage);
flappy.scale = 0.4;

gameOver = createSprite(400,200);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.7;

restart = createSprite(400,250);
restart.addImage(restartImg);
restart.scale = 0.1;


score = 0;


}

function draw() {
background(255);

flappy.setCollider("circle", 0, 0 ,40);
flappy.debug = false;

if(gameState === PLAY){
  ground.velocityX = -2;

  gameOver.visible = false;
  restart.visible = false;

  score = score + Math.round(frameCount/80);

  if (ground.x <  350) {
    ground.x = ground.width / 2;
  }

  //hacer que salte al presionar la barra espaciadora
if (keyDown("space")) {
  flappy.velocityY = -10;
  flySound.play();
} 

flappy.velocityY = flappy.velocityY + 0.8

spawnObstaclesdown();
spawnObstaclesup();
 
if (obstaclesGroup.isTouching(flappy)) {
  dieSound.play();
  gameState = END;
}
}

else if(gameState === END){
  ground.velocityX = 0;

  obstaclesGroup.setVelocityXEach(0);

  flappy.velocityY=0;

  gameOver.visible = true;
  restart.visible = true;

  obstaclesGroup.setLifetimeEach(-1);

  obstaclesGroup.depth = gameOver.depth;
  gameOver.depth = gameOver.depth + 1;
}

if(mousePressedOver(restart)){
  reset();
}

flappy.collide(invisibleGround);
invisibleGround.visible = false;




drawSprites();

textSize(20);
fill("orange");
strokeWeight(5);
stroke("black");
text("Puntuación: " + score, 600, 40);

}

function reset() {
  gameState = PLAY;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();

  score = 0;
}


function spawnObstaclesdown() {
  //escribir aquí el código para aparecer los obstaculos de abajo
  if (frameCount % 30 === 0) {
    obstacledown = createSprite(800,165,10,40);
    obstacledown.addImage(obstacle_down)
    obstacledown.y = Math.round(random(350, 500))
    obstacledown.scale = 0.4;
    obstacledown.velocityX = -6;    

    //asignar lifetime a la variable
    obstacledown.lifetime = 140;
    
    obstaclesGroup.add(obstacledown);  
  }   
}

function spawnObstaclesup() {
  //escribir aquí el código para aparecer los obstaculos de abajo
  if (frameCount % 30 === 0) {
    obstacleup = createSprite(800,15,10,40);
    obstacleup.addImage(obstacle_up)
    obstacleup.y = Math.round(random(0, 50))
    obstacleup.scale = 0.4;
    obstacleup.velocityX = -6; 
    
    //asignar lifetime a la variable
    obstacleup.lifetime = 140;

    obstaclesGroup.add(obstacleup);
    }
}
