

var rope;
var bg_Image, blink1, blink2, blink3, cut_button, eat_image_0, eat_image_1, eat_image_2, eat_image_3,
eat_image_4, rabbit_1, sad_1, sad_2, sad_3, bubble_img;

function preload() {

  bg_Image = loadImage("background.png");
  blink1 = loadImage("blink_1.png");
  blink2 = loadImage("blink_2.png");
  blink3 = loadImage("blink_3.png");
  cut_button = loadImage("cut_button.png");
  eat_image_0 = loadImage("eat_0.png");
  eat_image_1 = loadImage("eat_1.png");
  eat_image_2 = loadImage("eat_2.png");
  eat_image_3 = loadImage("eat_3.png");
  eat_image_4 = loadImage("eat_4.png");
  rabbit_1 = loadImage("Rabbit-01.png");
  sad_1 = loadImage("sad_1.png");
  sad_2 = loadImage("sad_2.png");
  sad_3 = loadImage("sad_3.png");

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false;
}

function setup() {

  var Device = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (Device) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW+80, canH);
  }
  else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW, canH);
  }

  frameRate(80);

  createCanvas(800,400);
  createSprite(400, 200, 50, 50);

  //btn 1
  button = createImg('cut_btn.png');
  button.position(80,150);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(330,250);
   button2.size(60,60);
   button2.mouseClicked(drop2);

   mute_btn = createImg('mute.png');
  mute_btn.position(width-80,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  rope = new Rope(8,{x:80,y:150});
  rope2 = new Rope(7,{x:330,y:250});

  ground = new Ground(450,250,60,20);

  bunny = createSprite(450,270,100,100);
  bunny.scale = 0.2;

  bubble_img = createSprite(450, 250, 50, 50);
  bubble_img.scale = 0.5;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  image(bg_img,0,0, width, height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    remove.rope();
    bubble.visible = flase;
    world.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }

}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


