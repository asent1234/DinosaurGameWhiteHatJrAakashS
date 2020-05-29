var trex, trexrun, trexcollide,ground, groundimage, groundline, cloudimage, cloudG, obstacleG, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, points,frame1, highscore, os, PLAY, END , gao, reb, gaoi, rebi, bc, bc2

var jump, die, check

function preload(){
  trexrun = loadAnimation("trex1.png", "trex3.png", "trex4.png" )
  trexcollide = loadAnimation("trex_collided.png")
  groundimage = loadImage("ground2.png")
  cloudimage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  rebi = loadImage("restart.png")
  gaoi = loadImage("gameOver.png")
  jump = loadSound('jump.mp3')
  die = loadSound('die.mp3')
  check = loadSound('checkPoint.mp3')
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(20,170,1,1)
  trex.addAnimation("trexrunning",trexrun)
  trex.scale = 0.4
  ground = createSprite(200,180,400,20);
  ground.addImage("trexground", groundimage)
  groundline = createSprite(200,190,400,1)
  groundline.visible = false
  ground.x = ground.width /2;
  cloudG = new Group()
  obstacleG = new Group()
  points = 0
  frame1 = 0
  highscore = 0
  PLAY = 1
  END = 0
  os = -4
  gameState = PLAY 
  trex.setCollider("rectangle",0 ,0 ,60,80);
  gao = createSprite(300,100,1,1)
  gao.addImage("gameover", gaoi)
  gao.scale = 0.5
  reb = createSprite(300,130,1,1)
  reb.addImage("restart", rebi)
  reb.scale = 0.5
  var bc = createSprite(590,random(10,125),10,10)
  bc.addImage("cloud", cloudimage)
  bc.velocityX =-4
  var bc2 = createSprite(400,random(10,125),10,10)
  bc2.addImage("cloud", cloudimage)
  bc2.velocityX =-4
}

function draw() {
  frame1 = frame1+ 1
  background("white");
  
  if (gameState === PLAY){
      reb.visible = false
      gao.visible = false
      ground.velocityX = os
      if(trex.y >= 160 && keyDown("space")){
        trex.velocityY = -14
        jump.play();
      }
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      gravity();

      trex.collide(groundline)
      console.log(trex.y)

      points = Math.round(frame1/3)
      text("Points:" + points,530,50) 
      text("High Score:" + highscore,430,50) 
      if(points%100 === 0){
        check.play()
        os = os - 1
      }
      if(trex.overlap(obstacleG)){
           gameState = END
           os = 0
          die.play();
          trex.addAnimation("trexcollided",trexcollide)

      }  
    spawnClouds()
    spawnObstacles()
 
  }
  else if(gameState === END){
    reb.visible = true
    gao.visible = true
    ground.velocityX = 0
    trex.velocityY = 0  
    trex.changeAnimation("trexcollided", trexcollide)
    obstacleG.setVelocityXEach(0);
    cloudG.setVelocityXEach(0);
    cloudG.setLifetimeEach(-1)
    obstacleG.setLifetimeEach(-1) 
    if(mousePressedOver(reb)){
      gameState = PLAY
      obstacleG.setLifetimeEach(1) 
      cloudG.setLifetimeEach(1)
      trex.changeAnimation("trexrunning", trexrun)
      if (highscore< points){
        highscore = points
      }
      points = 0
      frame1 = 0
      os = -4
    }
     //displace(obstacleG)
    }
  drawSprites();
}
function spawnClouds(){
  if(frameCount%60=== 0){ 
  var Cloud = createSprite(590,random(10,75),10,10)
  Cloud.lifetime = 160
  Cloud.addImage(cloudimage)
  trex.depth = Cloud.depth+1
  Cloud.velocityX = os
  cloudG.add(Cloud)
  }
}
function spawnObstacles(){
  if(frameCount%60=== 0){
  var obstacle = createSprite(570,170,1,1)
  obstacle.scale = 0.45
  var num = random(1,6)
  num = Math.round(num)   
  switch (num){
    case 1: obstacle.addImage(obstacle1)
            break;
    case 2: obstacle.addImage(obstacle2)
            break;
    case 3: obstacle.addImage(obstacle3)
            break;
    case 4: obstacle.addImage(obstacle4)
            break;
    case 5: obstacle.addImage(obstacle5)
            break;
    case 6: obstacle.addImage(obstacle6)
            break;
    default: break;    
  }
  obstacle.velocityX = os
  obstacle.lifetime = 150
  obstacleG.add(obstacle)
}
}
function gravity(){
 trex.velocityY = trex.velocityY + 0.8 
}
