var bg, bgImg;
var shooter, shooter_shooting;
var player;
var zombie, zombieImg;
var zombieGroup, bulletsGroup;
var life1, life2, life3;
var life1_img, life2_img, life3_img;
var bullets = 70;
var bulletsImg;
var fire, fireSound;
var score = 0;
var life = 0;


function preload(){
  bgImg = loadImage("bg.jpeg");
  shooter = loadImage("shooter_2.png");
  shooter_shooting = loadImage("shooter_3.png");
  zombieImg = loadImage("zombie2.png");
  life1_img = loadImage("heart_1.png")
  life2_img = loadImage("heart_2.png")
  life3_img = loadImage("heart_3.png")
  bulletsImg = loadImage("Bullets.png")
  fireSound = loadSound("lose.mp3")
}

function setup() {
  createCanvas(1300, 650);
  
  //adicionando a imagem de fundo
  bg = createSprite(660, 450, 30, 30);
  bg.addImage(bgImg);

  //adcionando o jogador
  player = createSprite(180 , 430, 50, 50);
  player.addImage(shooter);
  player.scale = 0.3;

  //ajustando o raio colisor
  player.setCollider("rectangle", 0, 0, 300,300);
  player.debug = false;

  //criando grupo de zombies
  zombieGroup = new Group();
  bulletsGroup = new Group();

  //criando a vida do jogador
  life1 = createSprite(1100, 40, 20, 20);
  life1.visible = false;
  life1.addImage("heart1",life1_img);
  life1.scale = 0.4;

  life2 = createSprite(1050, 40, 20, 20);
  life2.visible = false;
  life2.addImage("heart2",life2_img);
  life2.scale = 0.4;

  life3 = createSprite(1100, 40, 20, 20);
  life3.addImage("heart3",life3_img);
  life3.scale = 0.4;
  

  

}

function draw() {
  background(220); 

 

  //movendo o jogador para baixo
  if(keyDown("S")){
    player.y += 10;
  }

  //movendo o jogador para cima
  if(keyDown("W")){
    player.y -= 10;
  }

  //soltar as balas e mudar a animação do atirador quando a tecla espaço for pressionada
  if(keyWentDown("SPACE")){
    bullets = createSprite(180, player.y -30, 20, 10);
    bullets.addImage(bulletsImg);
    bullets.scale = 0.1;
    bullets.velocityX = 20;
    fireSound.play();

    bulletsGroup.add(bullets);
    player.addImage(shooter_shooting);
  }
  else if(keyWentUp("SPACE")){
    player.addImage(shooter);
  }

  //destruir o zumbi quando for acertado pela  munição
  if(zombieGroup.isTouching(bulletsGroup)){
    for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(bulletsGroup)){
        zombieGroup[i].destroy();
        bulletsGroup.destroyEach();
        score +=1;
        console.log(score);
      }
    }

  }

  if(zombieGroup.isTouching(player)){
    for(var i= 0; i < zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy();
        life = life-1;


      }
    }
  }


  //chamando a função de gerar zombies
  monster();

   //adcionando a pontuação
   textSize(100);
   //fill("red");
   text("Pontuação: "+ score, 300, 450);

   text("Vidas: "+ life, 100, 500);

  drawSprites();

}


function monster(){
  if(frameCount %50 == 0){
    zombie = createSprite(1300, random(100, 600),40, 40);
    zombie.addImage(zombieImg);

    zombie.velocityX =- 2;
    zombie.lifeTime = 650;
    zombie.scale = 0.6;
    zombieGroup.add(zombie);
  }
}