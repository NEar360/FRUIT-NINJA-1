//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife, fruit, monster, fruitGroup, monsterGroup, score, r, randomFruit, position;
var knifeImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var KnifeSound, GameSound, gameImg,endSound,startSound,flashimg,trailimg,trail,logos,logoimg,knifeImage2,back2;

function preload() {

  back2 = loadImage("back.gif");
  knifeImage = loadImage("3333.png");
  knifeImage2 = loadImage("knife.png");
  trailimg = loadImage("shadow.png");
  flashimg = loadImage("flash.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  gameImg = loadImage("33.jpg");
  logoimg = loadImage("logo.png");

  //load sound here

  KnifeSound = loadSound("knifeSwoosh.mp3");
  GameSound = loadSound("gameover.mp3");
  endSound = loadSound("gameover1.mp3");
  startSound = loadSound("start.mp3");
  logo();
}



function setup() {
  createCanvas(600, 600);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.2

  //set collider for sword
  knife.setCollider("rectangle", 0, 0, 40, 40);

  // Score variables and Groups
  score = 0;
  fruitGroup = createGroup();
  monsterGroup = createGroup();
  startSound.play();
  
  trail = createSprite(knife.x,knife.y,200,200);
  trail.addImage(trailimg);
  knife.debug=false;
}

function draw() {
  
  knife.setCollider("circle",10,10,90);
  logos.depth=knife.depth-1;
  background(gameImg);
  trail.y=knife.y+20;
  trail.x=knife.x-30;

  if (gameState === PLAY) {

    //Call fruits and Monster function
    fruits();
    Monster();

    // Move sword with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    // Increase score if sword touching fruit
    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      KnifeSound.play();
      score = score + 1;
      knife.addImage(flashimg);
      knife.scale=0.5;
    } else {
      // Go to end state if sword touching enemy
      knife.addImage(knifeImage);
      knife.scale=0.5;
    }
    if (monsterGroup.isTouching(knife)) {
        gameState = END;
        //add gameover sound here
        //GameSound.play();
        endSound.play();
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);

        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale = 0.6;
        knife.x = 300;
        knife.y = 300;
      }
  }
  if (gameState === END) {
    if (keyDown("enter")) {
      gameState = PLAY;
      score = 0;
      knife.addImage(knifeImage);
      knife.scale = 0.2;
      startSound.play();
      logo();
    }
  }
  if(score===10&&score<13){
    background(back2);
  }
  if(score>10){
    knife.addImage(knifeImage2);
    if(gameState===END){
      knife.addImage(gameOverImage);
    }
  }
  drawSprites();
  //Display score
  fill(1200);
  textSize(25);
  text("Score : " + score, 250, 50);
  textSize(21);
  text("Click on this text and press enter,to reset when game over", 10, 80);
}


function Monster() {
  if (World.frameCount % 80 === 0) {
    monster = createSprite(450, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 550));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = -(8 + (score / 10));
    monster.lifetime = 60;

    monsterGroup.add(monster);
  }
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    position = Math.round(random(1, 2));
    fruit = createSprite(400, 200, 20, 20);

    //using random variable change the position of fruit, to make it more challenging

    if (position == 1) {
      fruit.x = 600;
      //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX = -(7 + (score / 4));
    } else {
      if (position == 2) {
        fruit.x = 0;

        //update below give line of code for increase fruitGroup speed by 4
        fruit.velocityX = 7 + (score / 4);
      }
    }

    fruit.scale = 0.8;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 550));


    fruit.lifetime = 100;

    fruitGroup.add(fruit);
  }
}
function logo(){
  logos = createSprite(300,200,200,200);
  logos.addImage(logoimg);
  logos.scale=0.7;
  logos.lifetime=50;
}