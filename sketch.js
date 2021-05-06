var ground,boy,car,truck,bus,coin;
var groundImage,boyImage,carsImage,truckImage,busImage,coinsImage
var score = 0;
var gameState = "play";
var obstacleGroup;



function preload(){
     groundImage = loadImage("sprites/track.jpg");
     carsImage = loadImage("sprites/car11.png");
     truckImage = loadImage("sprites/truck11.png");
     busImage = loadImage("sprites/bus11.png");
     boyImage = loadAnimation("sprites/boy11.png","sprites/boy22.png","sprites/boy33.png");
     coinImage = loadImage("sprites/coin.png");

}

function setup(){
    createCanvas(600,1000);

    ground = createSprite(300,300);
    ground.addImage(groundImage);
    ground.velocityY = 10;

    boy = createSprite(170,800,20,20);
    boy.debug = true;
    boy.addAnimation("boy",boyImage);
   
    boy.scale = 0.8;

   obstacleGroup = new Group();
   coinsGroup = new Group();
}

function draw(){
    background("black");

   
    if(gameState === "play"){
        if(ground.y > 800){
            ground.y = height/2;
        }
        boy.x = World.mouseX;

        spawnObstacle();
        coins();

        if(coinsGroup.isTouching(boy)){
            coinsGroup.destroyEach();
            score=score+10;
        }
    
        if(obstacleGroup.isTouching(boy)){
            
            gameState = "end";
            //console.log(gameState);
        }
        drawSprites();
    }else if(gameState === "end"){
       // boy.destroyEach();
        ground.velocityY = 0;
        obstacleGroup.setLifetimeEach(-1);
        obstacleGroup.setVelocityYEach(0);
        obstacleGroup.destroyEach();
        
 
        textSize(50);
        fill("yellow");
        text("Game Over",width/2 - 50,height/4 +100);
        

    }

    textSize(30);
    fill("white");
    text("Coins:"+ score,140,30);
    
}

function spawnObstacle(){
    if(frameCount % 300 === 0){
        var obstacle = createSprite(random(100,450),random(10,300),10,10);
        obstacle.debug = true;
        obstacle.velocityY = 6;
        var r = Math.round(random(1,3));
        switch(r){
            case 1: obstacle.addImage(carsImage); 
                    break;

            case 2: obstacle.addImage(busImage);
                    break;

            case 3: obstacle.addImage(truckImage);
                    break;

            default: 
                    break;
        }

        obstacle.scale = 0.5;
        obstacle.lifetime = 300;
        obstacleGroup.add(obstacle);

    }
}

function coins(){
    if(frameCount%200 === 0){
        var coin = createSprite(Math.round(random(50,350),40,10,10));
        coin.addImage(coinImage);
        coin.velocityY = 3;
        coin.lifetime = 300;
        coin.scale = 0.05;
        coinsGroup.add(coin);
    }
}