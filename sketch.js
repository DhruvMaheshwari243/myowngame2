const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backGroundImg;
var crane;
var hook;
var chain;
var garbage1,garbage2,garbage3;
var garbageGroup;
var invisibleSprite,invisibleStand;
var garbageTruck,garbageTruckImg;
var score = 0;

function preload() {
   backGroundImg = loadImage("images/background.gif");

   garbage1 = loadImage("images/bottle.png");
   garbage2 = loadImage("images/poly-bag.png");
   garbage3 = loadImage("images/polythene.png");
   garbageTruckImg = loadImage("images/garbage truck.png");

}

function setup(){
    var canvas = createCanvas(displayWidth-10,displayHeight-200);
    engine = Engine.create();
    world = engine.world;

    crane = new Crane(displayWidth-200,displayHeight/2 - 50);
    hook = new Hook(displayWidth-400,displayHeight/2 - 50);
    chain = new Chain(hook.body,crane.body,-130,-130);
    garbageGroup = new Group();

    invisibleSprite = createSprite(100,100,30,30);
    invisibleSprite.visible = false;

    garbageTruck = createSprite(displayWidth - 1250,displayHeight/2-50);
    garbageTruck.addImage(garbageTruckImg);
    garbageTruck.scale = 0.7;
    invisibleStand = createSprite(displayWidth - 1200, displayHeight/2-120,250,20);
    invisibleStand.visible = false;


    for(var i = 0; i < 10; i++){
        garbage = createSprite(random(400,1200),random(550,640));
        var randomNumber = Math.round(random(1,3))
        switch(randomNumber){
            case 1 : garbage.addImage(garbage1);
                    garbage.scale = 0.15;
                    break;
            case 2 : garbage.addImage(garbage2);
                    garbage.scale = 0.15;
                    break;
            case 3 : garbage.addImage(garbage3);
                    garbage.scale = 0.5;
                    break;
        }
        garbageGroup.add(garbage);
    }
}

function draw(){
    background(backGroundImg);
    Engine.update(engine);

   crane.display();
   hook.display();
   chain.display();

   invisibleSprite.x = hook.body.position.x;
   invisibleSprite.y = hook.body.position.y;

   textSize(20);
   fill("black");
   text("Score : " + score, displayWidth/2,20)
   

 for(var i = 0 ; i < garbageGroup.length ; i++){
     if(invisibleSprite.isTouching(garbageGroup[i])){
        garbageGroup[i].x = invisibleSprite.x;
        garbageGroup[i].y = invisibleSprite.y;
     }

     if(invisibleStand.isTouching(garbageGroup[i])){
         garbageGroup[i].destroy();
         score = score + 5;
     }
 }
   
   drawSprites();
}

function keyPressed(){
    if(keyCode === 37){
     //   Matter.Body.setStatic(crane.body,true);
        crane.body.position.x -= 15;
    }
    if(keyCode === 39){
      //  Matter.Body.setStatic(crane.body,true);
        crane.body.position.x += 15;
    }
}

function mouseDragged(){
    Matter.Body.setPosition(hook.body,{x: mouseX, y : mouseY});
}
