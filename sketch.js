var canvas;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex,trexCollided,ground,invisibleGround,gameOver,restart;
var trexImg,trexCollidedImg,groundImg,gameOverImg,restartImg,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,cloud;
var obstaclesGroup,cloudsGroup;
var count = 0;

function preload(){
  trexImg = loadImage("images/Trex.gif");
  trexCollidedImg = loadImage("images/TrexCollided.png");
  groundImg = loadImage("images/Ground.png");
  gameOverImg = loadImage("images/GameOver.png");
  restartImg = loadImage("images/Restart.png");
  obstacle1 = loadImage("images/Obstacle1.png");
  obstacle2 = loadImage("images/Obstacle2.png");
  obstacle3 = loadImage("images/Obstacle3.png");
  obstacle4 = loadImage("images/Obstacle4.png");
  obstacle5 = loadImage("images/Obstacle5.png");
  obstacle6 = loadImage("images/Obstacle6.png");
  cloudImg = loadImage("images/Cloud.png");
}

function setup() {
  canvas = createCanvas(displayWidth-20,displayHeight-30);

  //Create the Bodies Here.
  trex = createSprite(100,400);
  trex.addImage(trexImg);
  trex.scale = 1;
  trex.setCollider("circle",0,0,30);

  ground = createSprite(200,450,100,20);
  ground.addImage(groundImg);
  ground.x = ground.width/2;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  gameOver = createSprite(displayWidth/2+50,displayHeight/2-50,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  restart = createSprite(displayWidth/2+20,displayHeight/2-100,50,50);
  restart.addImage(restartImg);
  restart.visible = false;

}

function draw() {

  background(255);

  trex.collide(ground);

  if(gameState === PLAY){
    ground.velocityX = -(6 + 2*count/100);

    if (ground.x < 600){
      ground.x = ground.width/2;
    }

    if(keyDown("space") && trex.y >= 400){
      trex.velocityY = -12 ;
    }
    trex.velocityY = trex.velocityY + 0.8;

    count  = count + Math.round(World.frameRate/30);
 

  spawnObstacles();
  spawnClouds();

  //End the game when trex is touching the obstacle
  if(obstaclesGroup.isTouching(trex)){
    gameState = END;
  }
}
else if(gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
  //set velcity of each game object to 0
  ground.velocityX = 0;
  trex.velocityY = 0;
 // ObstaclesGroup.setVelocityXEach(0);
  //CloudsGroup.setVelocityXEach(0);
  
  //change the trex animation
  trex.addImage(trexCollidedImg);
  trex.scale = 0.5;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  
  //set lifetime of the game objects so that they are never destroyed
 // ObstaclesGroup.setLifetimeEach(-1);
  //CloudsGroup.setLifetimeEach(-1);
  
  
}

//creating a function when the mouse is pressed over the restart sprite  
if(mousePressedOver(restart)) {
  reset();
}

//console.log(trex.y);

//stop trex from falling down
trex.collide(ground);

drawSprites();
textSize(45);
  fill("black");
  text("Score:"+count,1000,100);
}

function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
count = 0;
trex.addImage(trexImg);
trex.scale = 1;
}

  

function spawnObstacles() {
  if(frameCount%60===0) {
    var obstacle = createSprite(800,400,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
   // var rand = randomNumber(1,6);
    obstacle.addImage(obstacle1);
    obstacle.collide(ground);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
  //  obstacle.lifetime = 70;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount%60===0) {
    var cloud = createSprite(400,320,40,10);
   // cloud.y = randomNumber(280,320);
    cloud.addImage(cloudImg);
    cloud.scale = 1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    //cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
 
}
