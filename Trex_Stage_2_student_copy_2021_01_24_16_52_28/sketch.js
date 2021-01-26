var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,clouding,cloudGroup,o1,o2,o3,o4,o5,o6,gameover,restart,gameovering,restarting;
var score=0
var PLAY=1
var END= 0
var gameState=PLAY

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  clouding= loadImage("cloud.png")
  o1=loadImage("obstacle1.png")
  o2=loadImage("obstacle2.png")
o3=loadImage("obstacle3.png")
o4=loadImage("obstacle4.png")
o5=loadImage("obstacle5.png")
o6=loadImage("obstacle6.png")
  restarting=loadImage("restart.png")
  gameovering= loadImage("gameOver.png")

}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudGroup=new Group()
  obstacleGroup=new Group()
  gameover= createSprite(300,100)
  gameover.addImage("gameover",gameovering)
  gameover.scale=0.5
  restart=createSprite(300,150)
  restart.addImage("restart",restarting)
  restart.scale=0.5
  
}


function draw() {
  background (180);
  //
  if(gameState===PLAY){
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  score= score+Math.round(getFrameRate()/60)
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(trex.isTouching(obstacleGroup)){
    gameState=END
    }
  spawnObstacle();
  spawnClouds();
  }
  else if(gameState===END){
    ground.velocityX=0
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
  }
  if(mousePressedOver(restart)){
reset();
    
  }
  text("score"+score,500,500)
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds(){
if(frameCount%60===0){
var cloud=createSprite(600,150)
cloud.addImage(clouding)
cloud.velocityX=-4
  cloud.y=random (100,150)
cloud.lifetime=220
  cloud.depth=trex.depth
  trex.depth=trex.depth+1
  cloudGroup.add(cloud)
  }
  }
function spawnObstacle(){
if(frameCount%60===0){
var obstacles= createSprite(600,180)
  obstacles.velocityX=-3
    var rand=Math.round (random(1,6))
  console.log(rand)
  switch(rand){
 case 1:obstacles.addImage(o1);
      break; 
      case 2:obstacles.addImage(o2);
      break;
      case 3:obstacles.addImage(o3);
       break;
      case 4:obstacles.addImage(o4);
      break;
      case 5:obstacles.addImage(o5);
      break ;
      case 6:obstacles.addImage(o6);
      break;
      default: break
  }
      obstacles.scale=0.5
      obstacles.lifetime=210
      obstacleGroup.add(obstacles)
  }
}
  function reset() {
 gamastate=PLAY
    gameover.visible=false
    restart.visible=false
    obstacleGroup.destroyEach()
    cloudGroup.destroyEach()
  }
  