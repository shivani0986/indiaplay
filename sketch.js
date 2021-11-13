var PLAY = 1;
var END = 0;
var gameState = PLAY;
var boy, boy_running, boy_collided;
var ground, invisibleGround, groundImage;
var badgesGroup, badgeImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var medal = 0;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var button,buttonImg;
var rand = Math.round(random(1,6));
function preload(){
  
  boy_running = loadAnimation("img/x1.png","img/x2.png","img/x3.png");
  boy_collided = loadAnimation("img/x3.png");
  groundImage = loadImage("img/helo.jpg");

  badgeImage1 = loadImage("img/b1.png");
  badgeImage2 = loadImage("img/b2.png");
  badgeImage3 = loadImage("img/b3.png");
  badgeImage4 = loadImage("img/b4.png");
  badgeImage5 = loadImage("img/b5.png");

  obstacle1 = loadImage("img/hud-removebg-preview.png");
  obstacle2 = loadImage("img/lol.png");
  obstacle3 = loadImage("img/cone.png");
  obstacle4 = loadImage("img/ti1.png");
  obstacle5 = loadImage("img/yo.png");
  obstacle6 = loadImage("img/block.png");

  //button ing added
  buttonImg = loadImage("img/S1.jpg");
  buttonImg2 = loadImage("img/S2.jpg")
  buttonImg3 = loadImage("img/S3.jpg")
  buttonImg4 = loadImage("img/S4.jpg");
  buttonImg5 = loadImage("img/S5.jpg")
  buttonImg6 = loadImage("img/S6.jpg");
  buttonImg7 = loadImage("img/S7.jpg");
  
  restartImg = loadImage("img/cute.png")
 gameOverImg = loadImage("img/flagee.jpg")

  jumpSound = loadSound("mu/Super Mario Jump.mp3")
  dieSound = loadSound("mu/The End.mp3")
  checkPointSound = loadSound("mu/Good.mp3")
  aSound = loadSound("mu/s1.mpeg")
  bSound = loadSound("mu/s2.mpeg")
  cSound = loadSound("mu/s3.mpeg")
  dSound = loadSound("mu/s4.mpeg")
  eSound = loadSound("mu/s5.mpeg")
  fSound = loadSound("mu/s6.mpeg")
  gSound = loadSound("mu/s7.mpeg")

}

function setup() {
  createCanvas(1500,450);
  
  boy = createSprite(230,200,20,50);
  boy.addAnimation("running", boy_running);
  boy.addAnimation("collided", boy_collided);
  boy.scale = 0.6;
  
  ground = createSprite(75,0,7000,3);
 //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(900,25,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.2;
  
  //restart = createSprite(750,140,50,30);
  restart = createSprite(40,400,50,30);
  restart.addImage(restartImg);
  restart.scale = 0.2;
 

  //button creating
  button1 = createSprite(140,180,100,300);
  button1.addImage(buttonImg);
  button1.scale = 0.2;
  button1.visible = false;

  button2 = createSprite(200,350,100,300);
  button2.addImage(buttonImg2);
  button2.scale = 0.2;
  button2.visible = false;

  button3 = createSprite(520,180,100,300);
  button3.addImage(buttonImg3);
  button3.scale = 0.2;
  button3.visible = false;

  button4 = createSprite(850,180,100,300);
  button4.addImage(buttonImg4);
  button4.scale = 0.2;
  button4.visible = false;

  button5 = createSprite(1250,180,100,300);
  button5.addImage(buttonImg5);
  button5.scale = 0.2;
  button5.visible = false;

  button6 = createSprite(700,350,100,300);
  button6.addImage(buttonImg6);
  button6.scale = 0.3;
  button6.visible = false;

  button7 = createSprite(1150,350,100,300);
  button7.addImage(buttonImg7);
  button7.scale = 0.2;
  button7.visible = false;
  
  gameOver.scale = 1;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(70,350,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and badge Groups
  obstaclesGroup = createGroup();
  badgesGroup = createGroup();
  //etc work
  boy.setCollider("circle",0,0,150);
  boy.debug = true

  score = 0;
}
function draw() {
  console.log(getFrameRate())
  background(groundImage);
  //displaying score
  textSize(20);
  fill("yellow")
  stroke("blue")
  text("Score: "+ score, 300,50);
  textSize(20);
  stroke("blue")
  fill("yellow")
  text("Medal: "+ medal, 200,50);
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& boy.y >= 160) {
        boy.velocityY = -12;
        jumpSound.play();
    }
    //add gravity
    boy.velocityY = boy.velocityY + 0.8 
    //spawn the badges
    spawnbadges(); 
    
      
        for(i=0;i<badgesGroup.length;i++){
          if(badgesGroup.get(i).isTouching(boy)){
            medal=medal+2
            badgesGroup.get(i).remove()

        }
      }
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(boy)){
        //boy.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()

      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
     // restart.visible = true;
      boy.visible = false;
     button1.visible = true;
     button2.visible = true;
     button3.visible = true;
     button4.visible = true;
     button5.visible = true;
     button6.visible = true;
     button7.visible = true;
     //change the boy animation
      boy.changeAnimation("collided", boy_collided);
     
      ground.velocityX = 0;
      boy.velocityY = 0

      // button function
     if(mousePressedOver(button1)){
        gameOver.visible = false;
        button2.visible = false;
        button3.visible = false;
        button4.visible = false;
        button5.visible = false;
        button6.visible = false;
        button7.visible = false;
        ground.visible = false;
        background("black");
        textSize(30)
        text("OUR GEMS OF OLYMPIC",450,200)
        fill("green")
        stroke("orange")
        text("PV.SINDHU",450,250)
        restart.visible = true;
        //ssssssssssssssssssssssssssssssooooooooooooo
        
        aSound.play()
      }

      if(mousePressedOver(button2)){
        gameOver.visible = false;
        button1.visible = false;
        button3.visible = false;
        button4.visible = false;
        button5.visible = false;
        button6.visible = false;
        button7.visible = false;
        ground.visible = false;
        background("black");
        textSize(30)
        text("OUR GEMS OF OLYMPIC",450,200)
        fill("green")
        stroke("orange")
        text("*",450,250)
        restart.visible = true;

        bSound.play()
      }
      if(mousePressedOver(button3)){
        gameOver.visible = false;
        button1.visible = false;
        button2.visible = false;
        button4.visible = false;
        button5.visible = false;
        button6.visible = false;
        button7.visible = false;
        ground.visible = false;
        background("black");
        textSize(30)
        text("OUR GEMS OF OLYMPIC",450,200)
        fill("green")
        stroke("orange")
        text("*",450,250)
        restart.visible = true;
        
        cSound.play()
      }
      if(mousePressedOver(button4)){
        gameOver.visible = false;
        button1.visible = false;
        button3.visible = false;
        button5.visible = false;
        button2.visible = false;
        button7.visible = false;
        button6.visible = false;
        ground.visible = false;
        background("black");
        textSize(30)
        text("OUR GEMS OF OLYMPIC",450,200)
        fill("green")
        stroke("orange")
        text("*",450,250)
        restart.visible = true;

        dSound.play()
      }
      if(mousePressedOver(button5)){
        gameOver.visible = false;
        button1.visible = false;
        button3.visible = false;
        button4.visible = false;
        button2.visible = false;
        button6.visible = false;
        button7.visible = false;
        ground.visible = false;
        background("black");
        textSize(30)
        text("OUR GEMS OF OLYMPIC",450,200)
        fill("green")
        stroke("orange")
        text("*",450,250)
        restart.visible = true;

        eSound.play()
      }
      if(mousePressedOver(button6)){
        gameOver.visible = false;
        button1.visible = false;
        button3.visible = false;
        button4.visible = false;
        button5.visible = false;
        button7.visible = false;
        button2.visible = false;
        ground.visible = false;
        background("black");
        textSize(30)
        text("OUR GEMS OF OLYMPIC",450,200)
        fill("green")
        stroke("orange")
        text("*",450,250)
        restart.visible = true;

        fSound.play()
      }
      if(mousePressedOver(button7)){
        gameOver.visible = false;
        button1.visible = false;
        button3.visible = false;
        button4.visible = false;
        button2.visible = false;
        button5.visible = false;
        button6.visible = false;
        ground.visible = false;
        background("black");
        textSize(30)
        text("OUR GEMS OF OLYMPIC",450,200)
        fill("green")
        stroke("orange")
        text("*",450,250)
        restart.visible = true;
        gSound.play()
      }
      
    
   obstaclesGroup.destroyEach();
   badgesGroup.destroyEach();

     obstaclesGroup.setVelocityXEach(0);
     badgesGroup.setVelocityXEach(0);    
   }
  
 
  //stop boy from falling down
  boy.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }

  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(1500,340,10,20);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    obstacle.setCollider("rectangle",0,0,150,70);
    obstacle.debug = true

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;

    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnbadges() {
  //write code here to spawn the badges
  if (frameCount % 130 === 0) {
    var badge = createSprite(1500,120,40,10);
    badge.y = Math.round(random(80,120));
    //badge.addImage(badgeImage);
    badge.scale = 0.5;
    badge.velocityX = -3;
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: badge.addImage(badgeImage1);         
              break;
      case 2: badge.addImage(badgeImage2);
            // medal = medal+2
              break;
      case 3: badge.addImage(badgeImage3);
              badge.scale=0.3;
           // medal = medal+3
              break;
      case 4: badge.addImage(badgeImage4);
              
           // medal = medal+2
              break;
      case 5: badge.addImage(badgeImage5);
              badge.scale=0.8;
           // medal = medal+3
              break;
      default: break;
    }
     //assign lifetime to the variable
    badge.lifetime = 500;   
    //adjust the depth
    badge.depth = boy.depth;
    boy.depth = boy.depth + 1;    
    //add each badge to the group
    badgesGroup.add(badge);
  }
}
function reset(){
gameState=PLAY;
obstaclesGroup.destroyEach();  
button1.destroy();
button2.destroy();
button3.destroy();
button4.destroy();
button5.destroy();
button6.destroy();
button7.destroy();

badgesGroup.destroyEach();  
boy.changeAnimation("running", boy_running);
score=0;

}
