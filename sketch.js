var health= 10
gameState = "play"

function preload(){
  bg = loadImage("images/bg.jpeg")
  fishimg = loadImage("images/fish.png")
  sharkimg = loadImage("images/shark.png")
  foodimg = loadImage("images/food.png")
  powerimg=loadImage("images/buble.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  player = createSprite(150,height/2,50,50)
  player.addImage(fishimg)
  player.mirrorX(-1);
  player.scale=0.2
  foodgroup=createGroup()
  sharkgroup=createGroup()
  powerupgroup=createGroup()
}

function draw() {
  background(bg);

  drawSprites();
  player.debug=true
if(gameState==="play"){
    healths()

  if(keyDown("space")){
    player.velocityY=-13
  }
  player.velocityY=player.velocityY+1
    sharks()
    foods()
   
      for(var j=0;j<foodgroup.length;j++){
      if(sharkgroup.isTouching(foodgroup.get(j))){
        foodgroup.get(j).y -=30
      }
      if(player.isTouching(foodgroup.get(j))){
        health=health+1
        foodgroup.get(j).destroy()
      }
    }

    for(var i= 0 ;i<sharkgroup.length;i++){
      if(player.isTouching(sharkgroup.get(i))){
        health=health-3
        sharkgroup.get(i).destroy()
      }
    }
    if(health<= 0 || player.y >height|| player.y<0){
      gameState="end"
    }
    powerups()
    if(player.isTouching(powerupgroup)){
      powerupgroup.destroyEach()
      health= 10
      sharkgroup.destroyEach()
    }
   
}
    if(gameState==="end"){
      foodgroup.destroyEach()
sharkgroup.destroyEach()
powerupgroup.destroyEach()
textSize(30)
fill("black")
text("Game Over", width/2,height/2)   
 text("Press R to restart",width/2-50,height/2+50)
 if(keyDown("r")){
   location.reload()
   
 }
 
}
  
 
}

function sharks(){
  if(frameCount%150===0 || frameCount===1){
    shark= createSprite(width+120,random(100,height-100))
    shark.addImage(sharkimg)
    shark.velocityX=-5
    shark.mirrorX(-1);
    shark.scale=0.5
    sharkgroup.add(shark)
    shark.debug=true
    shark.setCollider("rectangle",0,50,500,200)
    shark.lifetime=width/2
  }
}
function foods(){
  if(frameCount%100===0){
   
      food= createSprite(width+120,random(100,height-100))
    food.addImage(foodimg)
    food.velocityX=-5
    food.scale=0.1
    foodgroup.add(food)
    food.debug=true
    food.lifetime=width/2

  }
}

function healths(){
  for(var i = 0;i<health;i++){
    fill("green")
    rect(50+i*13,50,10,20)
  }
}

function powerups(){
  if(frameCount%250===0){
    power=createSprite(width+120,random(100,height-100))
    power.addImage(powerimg)
    power.velocityX=-5
    power.scale=0.1
    powerupgroup.add(power)
  }
}