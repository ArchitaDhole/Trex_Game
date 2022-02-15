var trex, trex_running, edges, groundImage, ground, cactusImg, cactus, cactus2Img, cactus2, wall, wall1, a, trex_go;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cactusImg = loadImage("cactus.png");
  cactus2Img = loadImage("cactus2.png");
  trex_out = loadImage("trex_go.png");
}

function setup(){
  createCanvas(600,200);
  a = 0;

  wall = createSprite(300,40,600,1);
  wall.visible = false;
  wall1 = createSprite(300,188,600,1);
  wall1.visible = false;

  // creating cactus
  cactus = createSprite(300,162,1,2);
  cactus.addImage("cactus",cactusImg);
  cactus.scale = 0.065;

  cactus2 = createSprite(600,162,1,2);
  cactus2.addImage("cactus2",cactus2Img);
  cactus2.scale = 0.15;
  
  // creating trex
  trex = createSprite(50,160,1,1);
  trex.addAnimation("running", trex_running);

  trex_stop = createSprite(50,165,1,1);
  trex_stop.addImage("out", trex_out);
  trex_stop.scale = .5;
  trex_stop.visible = false;
  
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50;

  ground = createSprite(300,180,600,20);
  ground.addImage("ground", groundImage);
  // ground.x = ground.width/2;
}


function draw(){
  //set background color 
  background("white");

  ground.velocityX = -8;
  cactus.velocityX = -8;
  cactus2.velocityX = -8;

  if(ground.x<0){
    ground.x = ground.width/2;
  }
  if(cactus.x<-8){
    cactus.x = 601;
  }
  if(cactus2.x<-8){
    cactus2.x = 601;
  }
  //stop trex from falling down 
  trex.collide(wall);
  trex.collide(wall1);
  drawSprites();
    
  //jump when space key is pressed
  if(keyDown("space")&&trex.y>160){
    trex.velocityY = -16;
  }

  trex.velocityY = trex.velocityY + .7;

  if(trex.isTouching(cactus)){
    a = a + 1;
  }
  if(trex.isTouching(cactus2)){
    a = a + 1;
  }
  
  // Game Over
  if(a===1){
    trex_stop.visible = true;
    textSize(40);
    text("Game Over",200,125);
    trex.destroy();
    // ground.destroy();
    // cactus.destroy();
    // cactus2.destroy();
    // wall.destroy();
    ground.velocityX = 0;
    cactus.velocityX = 0;
    cactus2.velocityX = 0;
  }
}