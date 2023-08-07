class GameArea{
  constructor(width, height){
      this.canvas = document.createElement("canvas");
      this.canvas.width=width;
      this.canvas.height=height;
      document.body.appendChild(this.canvas);
      this.cx = this.canvas.getContext("2d");
  }
  getHeight(){
    return this.canvas.height;
  }
  clear(){
    this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

GameArea.prototype.getWidth = function(){
  return this.canvas.width;
}

GameArea.prototype.loadMap = function(){
  /*
  let count = 0;
  for(let i=0; i<=480;i+=20){
    for(let j=0; j<=720;j+=20){
      if(count%2==0){
          this.cx.fillStyle="green";
          this.cx.fillRect(j,i,20,20);
          count++;
      } else if(count%2!=0) {
        this.cx.fillStyle="red";
        this.cx.fillRect(j,i,20,20);
        count++;
      }
    }
  }
  */
}

const myImage = new Image(4480, 4480);
myImage.src="mapa.png";

class Background{
constructor(image){
  this.image=image;
    this.x=-3500;
    this.y=-400;
  }
  updateBackground(){
    canva.cx.drawImage(this.image, this.x, this.y, 4480, 4480);
  }
}

const background = new Background(myImage);

let canva = new GameArea(720,480);
canva.loadMap();

const spriteImg = new Image(16,16);
spriteImg.src="Characters_V3_Colour.png";

class Player{
  constructor(x, y, width, height, color){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height = height;
    this.color=color;
  }
  update(){
    this.x=(canva.getWidth()/2)-(this.width/2);
    this.y=(canva.getHeight()/2)-(this.height/2);
    this.body = canva.cx;
    this.body.fillStyle = this.color;
    //this.body.fillRect((canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width, this.height);
    this.body.drawImage(spriteImg, 0, 0, 16, 16, (canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width*1.4, this.height*1.4);
  }
  clear(){
    this.body.clearRect(this.x, this.y, this.width, this.height);
  }
}

class Obstacles{
  constructor(x, y, width, height, color){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height = height;
    this.color=color;
  }
  update(){
    this.body = canva.cx;
    this.body.fillStyle = this.color;
    this.body.fillRect(this.x, this.y, this.width, this.height);
  }
  clear(){
    this.body.clearRect(this.x, this.y, this.width, this.height);
  }
}

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

function collisions({oPlayer, otherObj}){
  let playerLeft = player.x;
  let playerTop = player.y;
  let playerRight = player.x+player.width;
  let playerBottom = player.y+player.height;
  let otherLeft = otherObj.x;
  let otherTop = otherObj.y;
  let otherRight = otherObj.x+otherObj.width;
  let otherBottom = otherObj.y+otherObj.height;
  if(playerRight>otherLeft && playerLeft < otherRight && playerTop < otherBottom && playerBottom > otherTop){
    return true;
  }
}

let player = new Player(0,0,30,30,"black");
player.update();

const boundaries = [new Obstacles(200, 200, 50, 50, "rgba(255, 255, 255, 0.1)"), new Obstacles(400, 200, 50, 50, "rgba(255, 255, 255, 0.1)")];
const movingObjects = [background, ...boundaries];


function updateGame(){
  let movable=true;
  window.requestAnimationFrame(updateGame);
  canva.clear();
  background.updateBackground();
  boundaries.forEach(boundary => {
    boundary.update();
  })
  player.update();

    if(keys.w.pressed && lastKey==='w'){
      for(let i=0;i<boundaries.length;i++){
        let obstacle = boundaries[i];
        if(collisions({oPlayer: player, otherObj:{...obstacle, x: obstacle.x, y: obstacle.y+2.5}})){
          movable=false;
        }
      }
      if(movable){
        for(let i=0;i<movingObjects.length;i++){
          movingObjects[i].y+=3;
        }
      }
    }
    else if(keys.s.pressed && lastKey==='s'){
      for(let i=0;i<boundaries.length;i++){
        let obstacle = boundaries[i];
        if(collisions({oPlayer: player, otherObj:{...obstacle, x: obstacle.x, y: obstacle.y-2.5}})){
          movable=false;
        }
      }
      if(movable){
        for(let i=0;i<movingObjects.length;i++){
          movingObjects[i].y-=3;
        }
      }
    }
    else if(keys.a.pressed && lastKey==='a'){
      for(let i=0;i<boundaries.length;i++){
        let obstacle = boundaries[i];
        if(collisions({oPlayer: player, otherObj:{...obstacle, x: obstacle.x+2.5, y: obstacle.y}})){
          movable=false;
        }
      }
        if(movable){
          for(let i=0;i<movingObjects.length;i++){
            movingObjects[i].x+=3;
          }
        }
    }
    else if(keys.d.pressed && lastKey==='d'){
      for(let i=0;i<boundaries.length;i++){
        let obstacle = boundaries[i];
        if(collisions({oPlayer: player, otherObj:{...obstacle, x: obstacle.x-2.5, y: obstacle.y}})){
          movable=false;
        }
      }
       if(movable){
         for(let i=0;i<movingObjects.length;i++){
           movingObjects[i].x-=3;
         }
       }
    }
}

updateGame();

let lastKey;
window.addEventListener("keydown", e => {
  switch(e.key){
    case "w":
      keys.w.pressed=true;
      lastKey='w';
      break;
    case "a":
      keys.a.pressed=true;
      lastKey='a';
      break;
    case "s":
      keys.s.pressed=true;
      lastKey='s';
      break;
    case "d":
      keys.d.pressed=true;
      lastKey='d';
      break;
  }
})

window.addEventListener("keyup", e => {
  switch(e.key){
    case "w":
      keys.w.pressed=false;
      player.speedY=0;
      break;
    case "a":
      keys.a.pressed=false;
      player.speedX=0;
      break;
    case "s":
      keys.s.pressed=false;
      player.speedY=0;
      break;
    case "d":
      keys.d.pressed=false;
      player.speedX=0;
      break;
  }
})
