var boy,diamond,cash,jewel,sword,gameover,road;
var boyImg,collided,diamondImg,cashImg,jewelImg,swordImg,gameoverImg,roadImg;
var gameState="play",score=0;
var rewardGroup,swordGroup;

function preload(){
  boyImg=loadAnimation("images/Runner-1.png","images/Runner-2.png");
  collided=loadAnimation("images/Runner-1.png");
  diamondImg=loadImage("images/diamonds.png");
  cashImg=loadImage("images/cash.png");
  jewelImg=loadImage("images/jwell.png");
  swordImg=loadImage("images/sword.png");
  gameoverImg=loadImage("images/gameover.png");
  roadImg=loadImage("images/Road.png");
}
function setup() {
  createCanvas(600,650);

  road=createSprite(300,200,10,10);
  road.addImage(roadImg);
  road.scale=0.32;
  road.velocityY=3;
  road.y = road.height/2;
  boy=createSprite(300,550,10,10);
  boy.addAnimation("running",boyImg);
  boy.scale=0.08;

  gameover=createSprite(300,325,10,10);
  gameover.addImage(gameoverImg);
  gameover.scale=0.8;
  gameover.visible=false;

  swordGroup = new Group();
  rewardGroup = new Group();


}

function draw() {
  background(0);
  fill("white");
  textSize(20)
  text("Treasure: "+ score, 230,50);

if(gameState === "play"){

    gameover.visible = false;


  if (road.y > 400){
      road.y = road.height/2;
    }
    
  if(keyWentDown(LEFT_ARROW)){
      boy.velocityX-=2;
  }
  if(keyWentUp(LEFT_ARROW)){
    boy.velocityX=0;
  }
  if(keyWentDown(RIGHT_ARROW)){
    boy.velocityX+=2;
  }
  if(keyWentUp(RIGHT_ARROW)){
    boy.velocityX=0;
  }

  swords();
  rewards();
    
  if(swordGroup.isTouching(boy)){
        gameState = "end";
    }
  if(rewardGroup.isTouching(boy)){
      score=score+4;
      rewardGroup.destroyEach();
  }
  }
  
else if (gameState === "end") {
    gameover.visible = true;

    boy.changeAnimation("running",collided);
    road.velocityY = 0;
    boy.velocityY = 0
    
  swordGroup.setLifetimeEach(-1);
  rewardGroup.setLifetimeEach(-1);
   
   swordGroup.setVelocityXEach(0);
   rewardGroup.setVelocityXEach(0); 
   

 }

  drawSprites();
}

function rewards(){
  if (frameCount % 150 === 0){
    var reward = createSprite(Math.round(random(50,500)),0,10,40);
    reward.velocityY = 3;
    
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: reward.addImage(cashImg);
               break;
       case 2: reward.addImage(jewelImg);
               break;
       case 3: reward.addImage(diamondImg);
               break;
       default: break;
     }
     
     reward.scale = 0.1;
     reward.lifetime = 220;
    

     rewardGroup.add(reward);
}
}

function swords() {
 
  if (frameCount % 100 === 0) {
    sword=createSprite(Math.round(random(50,500)),0,10,10);
    sword.addImage(swordImg);
    sword.scale=0.15;
    sword.velocityY = 3;
    sword.lifetime = 220;
    
    swordGroup.add(sword);
  }
}

